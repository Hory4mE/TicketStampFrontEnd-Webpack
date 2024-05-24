const policy: PasswordPolicy = {
    minLength: 12,
    disallowCommonPasswords: true,
    checkStrength: (password: string) => {
        // A simple example of a strength checker, this can be replaced with a more sophisticated one
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasDigit = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return password.length >= 12 && (hasUpper || hasLower) && hasDigit && hasSpecial;
    }
};

export interface PasswordPolicy {
    minLength: number;
    disallowCommonPasswords: boolean;
    checkStrength?: (password: string) => boolean;
}

export interface PasswordValidationResult {
    errors: string[];
}

const commonPasswords: Set<string> = new Set([
    '123456', 'password', '123456789', '12345678', '12345', '1234567',
    'qwerty', 'abc123', '111111', 'password1' // Add more common passwords as needed
]);

export const validatePassword = (password: string): PasswordValidationResult => {
    const errors: string[] = [];

    if (password.length < policy.minLength) {
        errors.push(`Password must be at least ${policy.minLength} characters long.`);
        throw errors.join(', ');
    }

    if (policy.disallowCommonPasswords && commonPasswords.has(password)) {
        errors.push('Password is too common and easily guessable.');
        throw errors.join(', ');

    }

    if (policy.checkStrength && !policy.checkStrength(password)) {
        errors.push('Password does not meet the required strength criteria.');
        throw errors.join(', ');

    }

    return {
        errors
    };
};