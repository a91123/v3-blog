export function beforeUploadCheck (file: File, condition: CheckCondition) {
    const { format } = condition
    const isValidFormat = format ? format.includes(file.type) : true
    let error: ErrorType = null
    if (!isValidFormat) {
        error = 'format'
    }
    return {
        passed: isValidFormat,
        error
    }
}
type ErrorType = 'format' | null
interface CheckCondition {
    format?: string[];
}
