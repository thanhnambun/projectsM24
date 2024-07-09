import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom'
import { start } from 'repl';

export interface UserType {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    status: boolean;
    role: "ADMIN" | "USER";
}

function Login() {
    const [isSignUp, setIsSignUp] = useState(true);
    const [users, setUsers] = useState<UserType[]>([]);
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [terms, setTerms] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/profiveUser");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log({ name, email, password, terms });

        
        const response = await axios.get(`http://localhost:8080/profiveUser?email=${email}`);
            if(response.data.length) {
                alert('Email hoặc password đã tồn tại. Vui lòng đăng nhập hoặc đăng kí lại khác.');
            } else  {
                await axios.post("http://localhost:8080/profiveUser", { firstName,lastName, email, password, status:true });
                alert('Đăng ký thành công! Vui lòng đăng nhập.');
                setIsSignUp(false);
            }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        console.log({ email, password });

        try {
            const response = await axios.get(`http://localhost:8080/profiveUser?email=${email}&password=${password}`);
            if(response.data) {
                localStorage.setItem('token', response.data.id);
                navigate('/');    
                alert('Đăng nhập thành công');
            } else {
                alert('Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.');
            }
        } catch (error) {
            console.error("Error signing in:", error);
            alert('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.');
        }
    };

    return (
        <div className="app">
            <div className="left-panel">
                <header>
                <div className='logo1'>
                        <svg width="45" height="88" viewBox="0 0 135 178" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M68.4881 74C44.9881 74 39 37 39 37H96.4881C95.5035 46 91.9881 74 68.4881 74Z" fill="url(#paint0_linear_4_14)" stroke="#1B4A74" />
                            <path d="M112 8H24L38.5 12.5V29.5H97V12.5L112 8Z" fill="#20356A" stroke="#20356A" />
                            <path d="M70.8094 4.5V1H21.8094C19.8094 1 17.3094 3.5 17.3094 5.39803V21C13.3094 23.5 15.3094 26 17.3094 26.5V33.5H20.8094V26.5C24.0094 24.5 22.1427 22 20.8094 21V6.60436C22.0094 6.60436 22.8094 5 22.8094 4.60436L70.8094 4.5Z" fill="#203469" stroke="#203469" />
                            <path d="M36.5 62L65 87.5V151L36.5 125.5V62Z" fill="url(#paint1_linear_4_14)" />
                            <path d="M99.5 62L71.5 87.5V151L99.5 125.5V62Z" fill="url(#paint2_linear_4_14)" />
                            <path d="M30 72.5L22 69.5V135.5L51.5 148L30 128.5V72.5Z" fill="url(#paint3_linear_4_14)" />
                            <path d="M14.5 81L5 79V145.5L43 151L14.5 139V81Z" fill="url(#paint4_linear_4_14)" />
                            <path d="M115 69.5L106.5 72.5V128.5L85 148L115 135.5V69.5Z" fill="url(#paint5_linear_4_14)" />
                            <path d="M130.5 79L121.5 81V139L94.5 151L130.5 145.5V79Z" fill="url(#paint6_linear_4_14)" />
                            <path d="M36.5 62L65 87.5V151L36.5 125.5V62Z" stroke="#097F8D" />
                            <path d="M99.5 62L71.5 87.5V151L99.5 125.5V62Z" stroke="#097F8D" />
                            <path d="M30 72.5L22 69.5V135.5L51.5 148L30 128.5V72.5Z" stroke="#097F8D" />
                            <path d="M14.5 81L5 79V145.5L43 151L14.5 139V81Z" stroke="#097F8D" />
                            <path d="M115 69.5L106.5 72.5V128.5L85 148L115 135.5V69.5Z" stroke="#097F8D" />
                            <path d="M130.5 79L121.5 81V139L94.5 151L130.5 145.5V79Z" stroke="#097F8D" />
                            <path d="M1.2642 173V158.455H4.33949V164.456H10.5824V158.455H13.6506V173H10.5824V166.991H4.33949V173H1.2642ZM38.8104 165.727C38.8104 167.313 38.5097 168.663 37.9084 169.776C37.3118 170.888 36.4974 171.738 35.4652 172.325C34.4377 172.908 33.2824 173.199 31.9993 173.199C30.7067 173.199 29.5466 172.905 28.5192 172.318C27.4917 171.731 26.6797 170.881 26.0831 169.768C25.4865 168.656 25.1882 167.309 25.1882 165.727C25.1882 164.141 25.4865 162.792 26.0831 161.679C26.6797 160.566 27.4917 159.719 28.5192 159.136C29.5466 158.549 30.7067 158.256 31.9993 158.256C33.2824 158.256 34.4377 158.549 35.4652 159.136C36.4974 159.719 37.3118 160.566 37.9084 161.679C38.5097 162.792 38.8104 164.141 38.8104 165.727ZM35.6925 165.727C35.6925 164.7 35.5386 163.833 35.2308 163.128C34.9278 162.422 34.4993 161.887 33.9453 161.523C33.3913 161.158 32.7427 160.976 31.9993 160.976C31.2559 160.976 30.6072 161.158 30.0533 161.523C29.4993 161.887 29.0684 162.422 28.7607 163.128C28.4576 163.833 28.3061 164.7 28.3061 165.727C28.3061 166.755 28.4576 167.621 28.7607 168.327C29.0684 169.032 29.4993 169.567 30.0533 169.932C30.6072 170.296 31.2559 170.479 31.9993 170.479C32.7427 170.479 33.3913 170.296 33.9453 169.932C34.4993 169.567 34.9278 169.032 35.2308 168.327C35.5386 167.621 35.6925 166.755 35.6925 165.727ZM63.18 163.547H60.0692C60.0124 163.144 59.8964 162.787 59.7212 162.474C59.546 162.157 59.3211 161.887 59.0465 161.665C58.7719 161.442 58.4547 161.272 58.0948 161.153C57.7397 161.035 57.3538 160.976 56.9371 160.976C56.1843 160.976 55.5285 161.163 54.9698 161.537C54.4111 161.906 53.9779 162.446 53.6701 163.156C53.3623 163.862 53.2085 164.719 53.2085 165.727C53.2085 166.764 53.3623 167.635 53.6701 168.341C53.9826 169.046 54.4182 169.579 54.9769 169.939C55.5356 170.299 56.1819 170.479 56.9158 170.479C57.3278 170.479 57.7089 170.424 58.0593 170.315C58.4144 170.206 58.7293 170.048 59.0039 169.839C59.2785 169.626 59.5058 169.368 59.6857 169.065C59.8704 168.762 59.9982 168.417 60.0692 168.028L63.18 168.043C63.0996 168.71 62.8983 169.354 62.5763 169.974C62.2591 170.59 61.8306 171.142 61.2908 171.629C60.7558 172.112 60.1166 172.496 59.3732 172.78C58.6346 173.059 57.7989 173.199 56.8661 173.199C55.5688 173.199 54.4087 172.905 53.386 172.318C52.368 171.731 51.5631 170.881 50.9712 169.768C50.3841 168.656 50.0906 167.309 50.0906 165.727C50.0906 164.141 50.3888 162.792 50.9854 161.679C51.582 160.566 52.3917 159.719 53.4144 159.136C54.4371 158.549 55.5877 158.256 56.8661 158.256C57.7089 158.256 58.4902 158.374 59.2099 158.611C59.9343 158.848 60.5759 159.193 61.1346 159.648C61.6933 160.098 62.1478 160.649 62.4982 161.303C62.8533 161.956 63.0806 162.704 63.18 163.547ZM74.0891 160.99V158.455H86.0352V160.99H81.582V173H78.5423V160.99H74.0891ZM110.627 165.727C110.627 167.313 110.326 168.663 109.725 169.776C109.128 170.888 108.314 171.738 107.282 172.325C106.254 172.908 105.099 173.199 103.816 173.199C102.523 173.199 101.363 172.905 100.336 172.318C99.3081 171.731 98.4961 170.881 97.8995 169.768C97.3029 168.656 97.0046 167.309 97.0046 165.727C97.0046 164.141 97.3029 162.792 97.8995 161.679C98.4961 160.566 99.3081 159.719 100.336 159.136C101.363 158.549 102.523 158.256 103.816 158.256C105.099 158.256 106.254 158.549 107.282 159.136C108.314 159.719 109.128 160.566 109.725 161.679C110.326 162.792 110.627 164.141 110.627 165.727ZM107.509 165.727C107.509 164.7 107.355 163.833 107.047 163.128C106.744 162.422 106.316 161.887 105.762 161.523C105.208 161.158 104.559 160.976 103.816 160.976C103.072 160.976 102.424 161.158 101.87 161.523C101.316 161.887 100.885 162.422 100.577 163.128C100.274 163.833 100.123 164.7 100.123 165.727C100.123 166.755 100.274 167.621 100.577 168.327C100.885 169.032 101.316 169.567 101.87 169.932C102.424 170.296 103.072 170.479 103.816 170.479C104.559 170.479 105.208 170.296 105.762 169.932C106.316 169.567 106.744 169.032 107.047 168.327C107.355 167.621 107.509 166.755 107.509 165.727ZM121.609 160.99V158.455H133.555V160.99H129.102V173H126.062V160.99H121.609Z" fill="#D37200" />
                            <defs>
                                <linearGradient id="paint0_linear_4_14" x1="68" y1="37" x2="68" y2="77" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.345" stop-color="#1B4A74" />
                                    <stop offset="1" stop-color="#2F6596" />
                                </linearGradient>
                                <linearGradient id="paint1_linear_4_14" x1="67.75" y1="62" x2="67.75" y2="151" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#095670" />
                                    <stop offset="0.56" stop-color="#088E91" />
                                </linearGradient>
                                <linearGradient id="paint2_linear_4_14" x1="67.75" y1="62" x2="67.75" y2="151" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#095670" />
                                    <stop offset="0.56" stop-color="#088E91" />
                                </linearGradient>
                                <linearGradient id="paint3_linear_4_14" x1="67.75" y1="62" x2="67.75" y2="151" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#095670" />
                                    <stop offset="0.56" stop-color="#088E91" />
                                </linearGradient>
                                <linearGradient id="paint4_linear_4_14" x1="67.75" y1="62" x2="67.75" y2="151" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#095670" />
                                    <stop offset="0.56" stop-color="#088E91" />
                                </linearGradient>
                                <linearGradient id="paint5_linear_4_14" x1="67.75" y1="62" x2="67.75" y2="151" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#095670" />
                                    <stop offset="0.56" stop-color="#088E91" />
                                </linearGradient>
                                <linearGradient id="paint6_linear_4_14" x1="67.75" y1="62" x2="67.75" y2="151" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#095670" />
                                    <stop offset="0.56" stop-color="#088E91" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <i className="icon-placeholder"></i>
                </header>
                <div className="content">
                    <h2>Chắp cánh ước mơ cùng HOCTOT</h2>
                    <div className="background-image"></div>
                </div>
            </div>
            <div className="right-panel">
                <div className="auth-form">
                    <div className="tabs">
                    </div>
                    <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
                        {isSignUp && (
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        )}
                        {isSignUp && (
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        )}
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {isSignUp && (
                            <div className="checkbox">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={terms}
                                    onChange={(e) => setTerms(e.target.checked)}
                                />
                                <label htmlFor="terms">Đồng ý các điều khoản dịch vụ</label>
                            </div>
                        )}
                        <div className="xacnhan">
                            <button type="submit">{isSignUp ? 'Đăng ký' : 'Đăng nhập'}</button>
                            <p className="signin-link" onClick={() => setIsSignUp(!isSignUp)}>
                                {isSignUp ? "Đã có tài khoản" : "Tạo tài khoản mới"}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
