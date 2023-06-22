import { useState } from "react";

export default function SmsUseCounter() {
    const [userId, setUserId] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [data, setData] = useState({});
    const [email, setEmail] = useState("");


    return {
        userId, setUserId, isLoggedIn, setIsLoggedIn, data, setData, email, setEmail
    };
}