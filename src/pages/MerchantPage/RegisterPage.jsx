import React from "react";
import Input from "../../components/Input";
import { useState } from "react";
import axios from "../../configs/axios";
import { useRef } from "react";
import validateRegister from "../../validations/validate-merregis";
import { useAuth } from "../../feature/auth/contexts/AuthContext";




function RegisterPageMerchant() {
    const { merchantRegister } = useAuth();
    const [input, setInput] = useState({
        name: "",
        mobile: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [validateError1, setValidateError] = useState({
        name: "",
        mobile: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const refInput = useRef();

    const handleChangeInput = (e) => {
        
            console.log('Name:', e.target.name);
            console.log('Value:', e.target.value);
        
        setInput({ ...input, [e.target.name]: e.target.value });
        console.log(input)
        setValidateError({ ...validateError1, [e.target.name]: "" });
        console.log(new Date().toISOString());
    };
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            //
            //
            //

            const data = { ...input };
            const validateError = validateRegister(data);
            console.log(data)
            if (validateError) return setValidateError(validateError);
            const fromData = new FormData();
            for (let i in input) {
                fromData.append(i, input[i]);
            }

            //
            //
            //
            // const response = await axios.post("/user/register", fromData);
            const response = await merchantRegister(fromData);
            // รอว่าจะใช้ context หรือ redux
            console.log(response.data);
            // localStorage.setItem("token", user.data.token);
            //
            //
            //
        } catch (err) {
            console.log(err);
            if (err.response.data.message == "Mobile is already to use")
                setValidateError({
                    ...validateError1,
                    mobile: err.response.data.message,
                });
            if (err.response.data.message == "Username is already to use")
                setValidateError({
                    ...validateError1,
                    username: err.response.data.message,
                });
        }
    };
   
    return (
        <div className="max-w-[1024] w-8/12 mx-auto flex flex-col items-center bg-gray_primary">
            <form
                onSubmit={handleSubmit}
                className="w-8/12 bg-white h-full  my-12 flex flex-col items-center"
            >
                <div className="mt-2 mb-6  flex flex-col items-center  w-2/4 gap-5 ">
                    <h1 className="text-xl font-bold ite">สมัครบัญชีผู้ค้า</h1>
                    <input
                        type="file"
                        className=" hidden"
                        ref={refInput}
                        onChange={(e) => {
                            if (e.target.files[0]) {
                                setInput({ ...input, imgProfile: e.target.files[0] });
                            }
                        }}
                    />
                    <div
                        role="button"
                        className="w-28 h-28"
                        onClick={() => {
                            refInput.current.click();
                        }}
                    >
                        {input.imgProfile ? (
                            <div className="rounded-full h-full w-full overflow-hidden flex justify-center items-center">
                                <img
                                    src={URL.createObjectURL(input.imgProfile)}
                                    className="object-cover w-full h-full"
                                    alt=""
                                />
                            </div>
                        ) : (
                            <img
                                className="rounded-full"
                                src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                            />
                        )}
                    </div>
                    <div className="w-full">
                        <Input
                            placeholder="ชื่อ"
                            onChange={handleChangeInput}
                            name={"name"}
                        />
                        {validateError1.name ? (
                            <p className="text-red-500 text-sm">{validateError1.name}</p>
                        ) : null}
                    </div>
                    <div className="w-full">
                        <Input
                            type="username"
                            placeholder="ชื่อบัญชี"
                           
                            onChange={handleChangeInput}
                            name={"username"}
                        />
                        {validateError1.username ? (
                            <p className="text-red-500 text-sm">{validateError1.username}</p>
                        ) : null}
                    </div>
                    <div className="w-full">
                        <Input
                            placeholder="เบอร์โทร"
                            
                            onChange={handleChangeInput}
                            name={"mobile"}
                        />
                        {validateError1.mobile ? (
                            <p className="text-red-500 text-sm">{validateError1.mobile}</p>
                        ) : null}
                    </div>
                    <div className="w-full">
                        <Input
                            placeholder="รหัสผ่าน"
                            
                            onChange={handleChangeInput}
                            name={"password"}
                            type="password"
                        />
                        {validateError1.password ? (
                            <p className="text-red-500 text-sm">{validateError1.password}</p>
                        ) : null}
                    </div>
                    <div className="w-full">
                        <Input
                            placeholder="ยืนยันรหัสผ่าน"
                            
                            onChange={handleChangeInput}
                            name={"confirmPassword"}
                            type="password"
                        />
                        {validateError1.confirmPassword ? (
                            <p className="text-red-500 text-sm">
                                {validateError1.confirmPassword}
                            </p>
                        ) : null}
                    </div>
                    <button className="text-white w-full rounded-lg px-3 py-2 m-0 bg-blue_primary">
                        สมัคร
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegisterPageMerchant;