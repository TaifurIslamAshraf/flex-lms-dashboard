const statusOptions = (status: string) => {
    const statusOptions = status === "pending"
        ? ["confirmed", "follow up", "canceled", "deleted"]
        : status === "confirmed"
            ? ["processing", "canceled"]
            : status === "processing"
                ? ["warranty added", "canceled"]
                : status === "warranty added"
                    ? ["processing done",]
                    : status === "processing done"
                        ? ["On courier",]
                        : status === "follow up"
                            ? ["confirmed", "canceled", "deleted"]
                            : status === "canceled"
                                ? ["confirmed"]
                                : []

    return statusOptions
};

export default statusOptions;