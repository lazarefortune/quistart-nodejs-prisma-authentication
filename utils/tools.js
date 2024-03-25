export const tools = (fields, data) => {
    const keys = Object.keys(data)
    return fields.filter(field => !keys.includes(field))
}

