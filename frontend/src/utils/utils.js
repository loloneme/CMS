
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

export const convertToCorrectDateTime = (dateString) => {
    const date = new Date(dateString);
    const pad = (num) => (num < 10 ? '0' + num : num);
    
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export const convertToISO = (date) => {
    const isoDate = new Date(date);
    if (isNaN(isoDate)) {
        return '';
    }

    const formattedDate = isoDate.toISOString().split('T')[0];
    return formattedDate
}

export const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };


  export const getDateTimeNow = () =>{
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const initialDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    return initialDateTime;
  }
  