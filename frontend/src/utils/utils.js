
export const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result.split(',')[1]) 
        };
        reader.onerror = error => {
            reject(error);
        };
    })
}

export const convertToRussianDate = (isoDate) => {
    const dateObject = new Date(isoDate);

    const day = String(dateObject.getUTCDate()).padStart(2, '0');
    const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
    const year = dateObject.getUTCFullYear();

    return `${day}.${month}.${year}`;
}

export const convertToISO = (date) => {
    const isoDate = new Date(date);
    const formattedDate = isoDate.toISOString().split('T')[0];
    return formattedDate
}