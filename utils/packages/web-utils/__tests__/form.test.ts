import {
  serializeForm,
  validateForm,
  autoSaveForm,
  formDiff,
  resetFormField,
} from '../src/form';

describe('form utils', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    localStorage.clear();
  });

  it('serializeForm should return object and query string', () => {
    const form = document.createElement('form');
    form.innerHTML = '<input name="name" value="John" /><input name="age" value="30" />';
    const data = serializeForm(form);
    expect(data).toEqual({ name: 'John', age: '30' });
    expect(serializeForm(form, true)).toBe('name=John&age=30');
  });

  it('validateForm should report errors', () => {
    const form = document.createElement('form');
    form.innerHTML = '<input name="email" value="bad" /><input name="age" value="10" />';

    const result = validateForm(form, {
      email: { required: true, pattern: /^\S+@\S+\.\S+$/, message: 'Invalid format' },
      age: { min: 18 },
    });

    expect(result.valid).toBe(false);
    expect(result.errors.email).toBe('Invalid format');
    expect(result.errors.age).toBe('Minimum value is 18');
  });

  it('autoSaveForm should store data after debounce', () => {
    jest.useFakeTimers();
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.name = 'name';
    input.value = 'Alice';
    form.appendChild(input);
    document.body.appendChild(form);

    const stop = autoSaveForm(form, 'draft', 50);
    input.value = 'Bob';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    jest.advanceTimersByTime(60);
    expect(JSON.parse(localStorage.getItem('draft') as string)).toEqual({ name: 'Bob' });

    stop();
    jest.useRealTimers();
  });

  it('formDiff should detect changes', () => {
    const form = document.createElement('form');
    form.innerHTML = '<input name="name" value="John" /><input name="age" value="30" />';
    const changes = formDiff(form, { name: 'John', age: '20' });
    expect(changes).toEqual({ age: '30' });
  });

  it('resetFormField should reset inputs', () => {
    const input = document.createElement('input');
    input.value = 'x';
    resetFormField(input);
    expect(input.value).toBe('');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;
    resetFormField(checkbox);
    expect(checkbox.checked).toBe(false);

    const select = document.createElement('select');
    select.innerHTML = '<option value="1">1</option><option value="2">2</option>';
    select.selectedIndex = 1;
    resetFormField(select);
    expect(select.selectedIndex).toBe(0);
  });
});
