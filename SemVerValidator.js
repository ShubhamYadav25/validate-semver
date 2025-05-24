class SemVerValidator {
    constructor() {
        this.digits = '0123456789';
        this.letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.nonDigits = this.letters + '-';
    }

    isValidSemVer(input) {
        if (typeof input !== 'string') return false;

        const coreMatch = this.matchVersionCore(input);
        if (!coreMatch) return false;

        let remaining = input.slice(coreMatch.length);
        
        if (remaining.startsWith('-')) {
            const preReleaseMatch = this.matchPreRelease(remaining.slice(1));
            if (!preReleaseMatch) return false;
            remaining = remaining.slice(1 + preReleaseMatch.length);
        }

        if (remaining.startsWith('+')) {
            const buildMatch = this.matchBuild(remaining.slice(1));
            if (!buildMatch) return false;
            remaining = remaining.slice(1 + buildMatch.length);
        }

        return remaining.length === 0;
    }

    matchVersionCore(input) {
        const major = this.matchNumericIdentifier(input);
        if (!major) return null;

        if (input[major.length] !== '.') return null;
        const minor = this.matchNumericIdentifier(input.slice(major.length + 1));
        if (!minor) return null;

        if (input[major.length + 1 + minor.length] !== '.') return null;
        const patch = this.matchNumericIdentifier(input.slice(major.length + 1 + minor.length + 1));
        if (!patch) return null;

        return input.slice(0, major.length + 1 + minor.length + 1 + patch.length);
    }

    matchPreRelease(input) {
        let remaining = input;
        let totalLength = 0;
        let first = true;

        while (remaining.length > 0) {
            if (!first) {
                if (remaining[0] !== '.') break;
                remaining = remaining.slice(1);
                totalLength += 1;
            }

            const identifier = this.matchPreReleaseIdentifier(remaining);
            if (!identifier) return null;

            remaining = remaining.slice(identifier.length);
            totalLength += identifier.length;
            first = false;
        }

        return totalLength > 0 ? input.slice(0, totalLength) : null;
    }

    matchBuild(input) {
        let remaining = input;
        let totalLength = 0;
        let first = true;

        while (remaining.length > 0) {
            if (!first) {
                if (remaining[0] !== '.') break;
                remaining = remaining.slice(1);
                totalLength += 1;
            }

            const identifier = this.matchBuildIdentifier(remaining);
            if (!identifier) return null;

            remaining = remaining.slice(identifier.length);
            totalLength += identifier.length;
            first = false;
        }

        return totalLength > 0 ? input.slice(0, totalLength) : null;
    }

    matchPreReleaseIdentifier(input) {
        return this.matchAlphanumericIdentifier(input) || this.matchNumericIdentifier(input);
    }

    matchBuildIdentifier(input) {
        return this.matchAlphanumericIdentifier(input) || this.matchDigits(input);
    }

    matchAlphanumericIdentifier(input) {
        if (input.length === 0) return null;

        // Case 1: Starts with non-digit
        if (this.nonDigits.includes(input[0])) {
            let length = 1;
            while (length < input.length && this.isIdentifierCharacter(input[length])) {
                length++;
            }
            return input.slice(0, length);
        }

        // Case 2: Contains at least one non-digit
        let hasNonDigit = false;
        let length = 0;
        
        while (length < input.length && this.isIdentifierCharacter(input[length])) {
            if (this.nonDigits.includes(input[length])) {
                hasNonDigit = true;
            }
            length++;
        }

        return hasNonDigit ? input.slice(0, length) : null;
    }

    matchNumericIdentifier(input) {
        if (input.length === 0) return null;

        if (input[0] === '0') {
            return input.length === 1 || !this.digits.includes(input[1]) ? '0' : null;
        }

        if (this.digits.includes(input[0]) && input[0] !== '0') {
            let length = 1;
            while (length < input.length && this.digits.includes(input[length])) {
                length++;
            }
            return input.slice(0, length);
        }

        return null;
    }

    matchDigits(input) {
        if (input.length === 0 || !this.digits.includes(input[0])) return null;

        let length = 1;
        while (length < input.length && this.digits.includes(input[length])) {
            length++;
        }
        return input.slice(0, length);
    }

    isIdentifierCharacter(c) {
        return this.digits.includes(c) || this.nonDigits.includes(c);
    }
}

module.exports = SemVerValidator;