const today = new Date();
const startOfWeek = new Date(today);
startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
const endOfWeek = new Date(today);
endOfWeek.setDate(startOfWeek.getDate() + 6);

const datesArray = [];
for (let date = new Date(startOfWeek); date <= endOfWeek; date.setDate(date.getDate() + 1)) {
    datesArray.push(new Date(date));
}

export const lunchFields = {
    "userId": {
        label: "member",
        type: 'avatar'
    },
    "total": {
        label: "total",
        type: 'string'
    },
    ...Object.fromEntries(datesArray.map(date => [
        date.toLocaleString('en-US', {weekday: 'short'}).toLowerCase(), {
            label: `${
                date.toLocaleString('en-US', {weekday: 'long'})
            } ${
                date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                })
            }`,
            type: 'editable',
        }
    ]))
};
