export const validateAge = (dateOfBirth: string | Date, minAge: number = 10, maxAge: number = 100): { isValid: boolean; message?: string } => {
    if (!dateOfBirth) return { isValid: true };

    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    if (age < minAge) {
        return { isValid: false, message: `Age must be at least ${minAge} years old` };
    }

    if (age > maxAge) {
        return { isValid: false, message: `Age must be less than ${maxAge} years old` };
    }

    return { isValid: true };
};
