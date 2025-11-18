/**
 * @module Form
 * @description Form handling and validation utilities
 * @author Wayne
 * @Date 2025-11-16
 * @LastEditTime 2025-11-18 11:27:33
 */

/**
 * @function serializeForm
 * @description 将表单序列化为对象或查询字符串。Serializes form to object or query string
 * @param {HTMLFormElement} form - 表单元素。Form element
 * @param {boolean} asQueryString - 是否返回查询字符串(默认: false)。Whether to return query string (default: false)
 * @returns {object | string} 表单数据对象或查询字符串。Form data object or query string
 * @example
 * const form = document.querySelector('form');
 * serializeForm(form); // -> { name: 'John', email: 'john@example.com' }
 * serializeForm(form, true); // -> 'name=John&email=john@example.com'
 */
export function serializeForm(form: HTMLFormElement, asQueryString = false): any {
  const formData = new FormData(form);
  const data: any = {};

  formData.forEach((value, key) => {
    if (data[key]) {
      if (!Array.isArray(data[key])) {
        data[key] = [data[key]];
      }
      data[key].push(value);
    } else {
      data[key] = value;
    }
  });

  if (asQueryString) {
    return new URLSearchParams(data).toString();
  }

  return data;
}

/**
 * @function validateForm
 * @description 验证表单字段。Validates form fields
 * @param {HTMLFormElement} form - 表单元素。Form element
 * @param {object} rules - 验证规则。Validation rules
 * @returns {object} 验证结果。Validation result
 * @example
 * const form = document.querySelector('form');
 * const result = validateForm(form, {
 *   email: { required: true, pattern: /^\\S+@\\S+\\.\\S+$/ },
 *   age: { required: true, min: 18, max: 100 }
 * });
 * // -> { valid: false, errors: { email: 'Invalid format', age: 'Required' } }
 */
export function validateForm(
  form: HTMLFormElement,
  rules: Record<string, any>
): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const formData = new FormData(form);

  Object.keys(rules).forEach(fieldName => {
    const value = formData.get(fieldName) as string;
    const fieldRules = rules[fieldName];

    if (fieldRules.required && !value) {
      errors[fieldName] = fieldRules.message || 'This field is required';
      return;
    }

    if (value) {
      if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
        errors[fieldName] = fieldRules.message || 'Invalid format';
      }

      if (fieldRules.min !== undefined && parseFloat(value) < fieldRules.min) {
        errors[fieldName] = `Minimum value is ${fieldRules.min}`;
      }

      if (fieldRules.max !== undefined && parseFloat(value) > fieldRules.max) {
        errors[fieldName] = `Maximum value is ${fieldRules.max}`;
      }

      if (fieldRules.minLength && value.length < fieldRules.minLength) {
        errors[fieldName] = `Minimum length is ${fieldRules.minLength}`;
      }

      if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
        errors[fieldName] = `Maximum length is ${fieldRules.maxLength}`;
      }
    }
  });

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * @function autoSaveForm
 * @description 自动保存表单数据到localStorage。Auto-saves form data to localStorage
 * @param {HTMLFormElement} form - 表单元素。Form element
 * @param {string} storageKey - localStorage键名。localStorage key
 * @param {number} debounceTime - 防抖时间(毫秒,默认: 500)。Debounce time in ms (default: 500)
 * @returns {Function} 停止自动保存的函数。Function to stop auto-save
 * @example
 * const form = document.querySelector('form');
 * const stopAutoSave = autoSaveForm(form, 'my-form-draft');
 *
 * // Later, stop auto-saving
 * stopAutoSave();
 */
export function autoSaveForm(
  form: HTMLFormElement,
  storageKey: string,
  debounceTime = 500
): () => void {
  let timeoutId: number;

  const saveData = () => {
    const data = serializeForm(form);
    localStorage.setItem(storageKey, JSON.stringify(data));
  };

  const handleInput = () => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(saveData, debounceTime);
  };

  // Try to restore saved data
  try {
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      const data = JSON.parse(savedData);
      Object.keys(data).forEach(key => {
        const element = form.elements.namedItem(key) as HTMLInputElement;
        if (element) {
          element.value = data[key];
        }
      });
    }
  } catch (e) {
    console.error('Failed to restore form data:', e);
  }

  form.addEventListener('input', handleInput);

  return () => {
    form.removeEventListener('input', handleInput);
    clearTimeout(timeoutId);
  };
}

/**
 * @function formDiff
 * @description 检测表单数据变更。Detects form data changes
 * @param {HTMLFormElement} form - 表单元素。Form element
 * @param {object} originalData - 原始数据。Original data
 * @returns {object} 变更的字段。Changed fields
 * @example
 * const form = document.querySelector('form');
 * const original = { name: 'John', email: 'john@example.com' };
 * const changes = formDiff(form, original);
 * // -> { email: 'newemail@example.com' } (if email was changed)
 */
export function formDiff(
  form: HTMLFormElement,
  originalData: Record<string, any>
): Record<string, any> {
  const currentData = serializeForm(form);
  const changes: Record<string, any> = {};

  Object.keys(currentData).forEach(key => {
    if (currentData[key] !== originalData[key]) {
      changes[key] = currentData[key];
    }
  });

  return changes;
}

/**
 * @function resetFormField
 * @description 重置单个表单字段。Resets a single form field
 * @param {HTMLElement} field - 表单字段元素。Form field element
 * @example
 * const input = document.querySelector('input[name="email"]');
 * resetFormField(input);
 */
export function resetFormField(field: HTMLElement): void {
  if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
    if (field.type === 'checkbox' || field.type === 'radio') {
      (field as HTMLInputElement).checked = false;
    } else {
      field.value = '';
    }
  } else if (field instanceof HTMLSelectElement) {
    field.selectedIndex = 0;
  }
}
