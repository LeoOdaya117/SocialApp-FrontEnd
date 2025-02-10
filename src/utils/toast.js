import { toast } from 'vue-sonner';

/**
 * Global toast function for Vue Sonner with custom background colors
 * @param {string} type - Type of toast ('success', 'error', 'info', 'warning')
 * @param {string} message - The message to display
 * @param {object} options - Additional toast options (optional)
 */
export function showToast(type, message, options = {}) {
    const typeStyles = {
        success: { backgroundColor: '#4CAF50', color: '#ffffff' }, // Green
        error: { backgroundColor: '#FF5252', color: '#ffffff' }, // Red
        info: { backgroundColor: '#2196F3', color: '#ffffff' }, // Blue
        warning: { backgroundColor: '#FFC107', color: '#000000' }, // Yellow
    };

    const defaultOptions = {
        duration: 3000, // Toast stays for 3 seconds
        position: 'top-right',
        style: typeStyles[type] || {}, // Apply custom background color
        ...options // Merge with custom options
    };

    switch (type) {
        case 'success':
            toast.success(message, defaultOptions);
            break;
        case 'error':
            toast.error(message, defaultOptions);
            break;
        case 'info':
            toast.info(message, defaultOptions);
            break;
        case 'warning':
            toast.warning(message, defaultOptions);
            break;
        default:
            toast(message, defaultOptions);
    }
}
