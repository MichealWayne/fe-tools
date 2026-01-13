/**
 * @module Cookie
 * @note 目前不建议操作cookie，可见google Chrome《为停用第三方 Cookie 做好准备》：https://developers.google.com/privacy-sandbox/3pcd?hl=zh-cn
 * @author Wayne
 * @Date 2020-04-11 21:53:56
 * @LastEditTime 2024-08-25 10:00:55
 */
/**
 * @function getCookie
 * @description 从浏览器的cookie存储中按名称检索cookie值。Retrieves a cookie value by name from the browser's cookie store
 * @param {string} name - 要检索的cookie的名称。The name of the cookie to retrieve
 * @returns {string | null} 如果找到则返回cookie值，否则返回null。The cookie value if found, null otherwise
 * @example
 * // Get a simple cookie value
 * const username = getCookie('username');
 * if (username) {
 *   console.log('Welcome back,', username);
 * }
 *
 * @example
 * // Check for authentication token
 * const authToken = getCookie('auth_token');
 * if (!authToken) {
 *   redirectToLogin();
 * } else {
 *   initializeApp(authToken);
 * }
 *
 * @example
 * // Get user preferences with fallback
 * const theme = getCookie('theme') || 'light';
 * const language = getCookie('language') || 'en';
 * applyUserPreferences({ theme, language });
 *
 * @since 1.0.0
 * @see {@link setCookie} - Set cookie values
 * @see {@link delCookie} - Delete cookies
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie} - Browser support: All browsers
 * @see {@link https://developers.google.com/privacy-sandbox/3pcd} - Third-party cookie deprecation
 * @see {@link https://www.rfc-editor.org/rfc/rfc6265.html} - HTTP State Management Mechanism (Cookies)
 * @deprecated Consider using modern storage APIs like localStorage or sessionStorage for client-side data
 */
export declare function getCookie(name: string): string | null;
/**
 * @function setCookie
 * @description 使用指定的名称、值和可选配置设置cookie。Sets a cookie with specified name, value, and optional configuration
 * @param {string} name - Cookie名称（不应包含特殊字符）。Cookie name (should not contain special characters)
 * @param {string} value - Cookie值（如需要将进行URL编码）。Cookie value (will be URL encoded if needed)
 * @param {string} [time] - 过期时间：'s20'（20秒），'h12'（12小时），'d30'（30天）。默认：1天。Expiration time: 's20' (20 sec), 'h12' (12 hours), 'd30' (30 days). Default: 1 day
 * @param {string} [domain=''] - Cookie域（例如，'.example.com'用于子域访问）。Cookie domain (e.g., '.example.com' for subdomain access)
 * @param {string} [path='/'] - Cookie路径（默认为根路径）。Cookie path (defaults to root path)
 * @returns {void}
 * @example
 * // Set basic cookie (expires in 1 day)
 * setCookie('username', 'john_doe');
 *
 * @example
 * // Set cookie with custom expiration
 * setCookie('session_token', 'abc123', 'h2'); // Expires in 2 hours
 * setCookie('remember_me', 'true', 'd30');    // Expires in 30 days
 * setCookie('temp_data', 'value', 's300');    // Expires in 5 minutes
 *
 * @example
 * // Set cookie for specific domain and path
 * setCookie('api_key', 'secret123', 'd7', '.example.com', '/api');
 *
 * @example
 * // Set user preferences with proper encoding
 * const preferences = JSON.stringify({ theme: 'dark', lang: 'en' });
 * setCookie('user_prefs', encodeURIComponent(preferences), 'd365');
 *
 * @example
 * // Set secure cookie for authentication (consider SameSite and Secure flags)
 * setCookie('auth_token', token, 'h8', '', '/');
 * // Note: For production, consider using secure, httpOnly, and sameSite attributes
 *
 * @since 1.0.0
 * @see {@link getCookie} - Retrieve cookie values
 * @see {@link delCookie} - Delete cookies
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie} - Browser support: All browsers
 * @see {@link https://web.dev/samesite-cookies-explained/} - SameSite cookie security
 * @see {@link https://developers.google.com/privacy-sandbox/3pcd} - Third-party cookie deprecation timeline
 * @deprecated Consider using modern storage APIs or server-side sessions for sensitive data
 */
export declare function setCookie(name: string, value: string, time?: string, domain?: string, path?: string): void;
/**
 * @function delCookie
 * @description 通过将过期日期设置为过去来删除cookie。Deletes a cookie by setting its expiration date to the past
 * @param {string} name - 要删除的cookie的名称。The name of the cookie to delete
 * @returns {void}
 * @example
 * // Delete a specific cookie
 * delCookie('username');
 *
 * @example
 * // Logout function that clears authentication cookies
 * function logout() {
 *   delCookie('auth_token');
 *   delCookie('session_id');
 *   delCookie('user_preferences');
 *
 *   // Redirect to login page
 *   window.location.href = '/login';
 * }
 *
 * @example
 * // Clear user data on privacy settings change
 * function clearUserData() {
 *   const cookiesToClear = ['tracking_id', 'analytics_data', 'ad_preferences'];
 *   cookiesToClear.forEach(cookieName => {
 *     if (getCookie(cookieName)) {
 *       delCookie(cookieName);
 *     }
 *   });
 *
 *   showNotification('User data cleared successfully');
 * }
 *
 * @example
 * // Conditional cookie cleanup
 * function cleanupExpiredSessions() {
 *   const sessionCookie = getCookie('session_token');
 *   if (sessionCookie && isSessionExpired(sessionCookie)) {
 *     delCookie('session_token');
 *     delCookie('user_state');
 *     redirectToLogin();
 *   }
 * }
 *
 * @since 1.0.0
 * @see {@link getCookie} - Retrieve cookie values
 * @see {@link setCookie} - Set cookie values
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie} - Browser support: All browsers
 * @see {@link https://gdpr.eu/cookies/} - GDPR compliance for cookie management
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/consistent-identification.html} - WCAG: Consistent user experience
 */
export declare function delCookie(name: string): void;
