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

  it('serializeForm should retain duplicate values when the first value is empty', () => {
    const form = document.createElement('form');
    form.innerHTML = '<input name="tag" value="" /><input name="tag" value="second" />';

    expect(serializeForm(form)).toEqual({ tag: ['', 'second'] });
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

  it('autoSaveForm should restore checked checkbox values and clear unchecked defaults', () => {
    const form = document.createElement('form');
    form.innerHTML =
      '<input type="checkbox" name="topics" value="news" />' +
      '<input type="checkbox" name="topics" value="sports" checked />' +
      '<input type="checkbox" name="updates" value="email" checked />' +
      '<select name="colors" multiple>' +
      '<option value="red">Red</option><option value="blue">Blue</option>' +
      '<option value="green">Green</option></select>';
    localStorage.setItem(
      'checkbox-draft',
      JSON.stringify({ topics: ['news'], colors: ['blue', 'green'] })
    );

    const stop = autoSaveForm(form, 'checkbox-draft');
    const inputs = Array.from(form.querySelectorAll('input'));

    expect(inputs.map(input => input.checked)).toEqual([true, false, false]);
    expect(Array.from(form.querySelector('select')!.options).map(option => option.selected)).toEqual([
      false,
      true,
      true,
    ]);
    stop();
  });

  it('autoSaveForm should restore repeated text fields to their matching controls', () => {
    const form = document.createElement('form');
    form.innerHTML = '<input name="tag" /><input name="tag" />';
    localStorage.setItem('repeated-draft', JSON.stringify({ tag: ['first', 'second'] }));

    const stop = autoSaveForm(form, 'repeated-draft');

    expect(Array.from(form.querySelectorAll('input')).map(input => input.value)).toEqual([
      'first',
      'second',
    ]);
    stop();
  });

  it('autoSaveForm should ignore disabled repeated controls when restoring array values', () => {
    const form = document.createElement('form');
    form.innerHTML =
      '<input name="tag" value="disabled default" disabled />' +
      '<input name="tag" value="" />';
    localStorage.setItem('disabled-repeated-draft', JSON.stringify({ tag: ['saved'] }));

    const stop = autoSaveForm(form, 'disabled-repeated-draft');

    expect(Array.from(form.querySelectorAll('input')).map(input => input.value)).toEqual([
      'disabled default',
      'saved',
    ]);
    stop();
  });

  it('autoSaveForm should preserve checked defaults on disabled checkbox and radio controls', () => {
    const form = document.createElement('form');
    form.innerHTML =
      '<input type="checkbox" name="locked" value="yes" checked disabled />' +
      '<input type="radio" name="mode" value="fixed" checked disabled />' +
      '<input name="name" value="default" />';
    localStorage.setItem('disabled-controls-draft', JSON.stringify({ name: 'saved' }));

    const stop = autoSaveForm(form, 'disabled-controls-draft');

    expect(form.querySelector<HTMLInputElement>('input[name="locked"]')!.checked).toBe(true);
    expect(form.querySelector<HTMLInputElement>('input[name="mode"]')!.checked).toBe(true);
    expect(form.querySelector<HTMLInputElement>('input[name="name"]')!.value).toBe('saved');
    stop();
  });

  it('autoSaveForm should not let unchecked same-name controls shift repeated values', () => {
    const form = document.createElement('form');
    form.innerHTML =
      '<input type="checkbox" name="tag" value="checked" />' +
      '<input name="tag" />' +
      '<button type="submit" name="tag" value="submit">Submit</button>' +
      '<input name="tag" />';
    localStorage.setItem('mixed-repeated-draft', JSON.stringify({ tag: ['first', 'second'] }));

    const stop = autoSaveForm(form, 'mixed-repeated-draft');

    expect(Array.from(form.querySelectorAll('input')).map(input => input.value)).toEqual([
      'checked',
      'first',
      'second',
    ]);
    stop();
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
