export default class ErrorHandlers {
}
ErrorHandlers.template = (err) => `<yaf-error>${err.message}</yaf-error>`;
ErrorHandlers.data = (err) => {
    console.error(err);
    return err;
};
ErrorHandlers.notFound = (message) => {
    throw Error(message);
};
ErrorHandlers.localStorage = (key) => {
    console.error(`There was a problem with "localStorage.${key}. It is being removed.`);
    window.localStorage.removeItem('key');
};
//# sourceMappingURL=ErrorHandlers.js.map