const baseURL = "/api/notification";

export const sendNotification = async (notificationInfo, token) => {
    const result = await fetch(`${baseURL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token,
        },
        body: JSON.stringify(notificationInfo),
    });
    const data = await result.json();

    console.log(data);
    return data;
};

export const getNotifications = async (type, reqInfo, token) => {
    const result = await fetch(
        `${baseURL}/?group=${reqInfo.groupID || ""}`,
        {
            headers: {
                "auth-token": token,
            },
        }
    );
    const data = await result.json();
    console.log(data);
    return data;
};
