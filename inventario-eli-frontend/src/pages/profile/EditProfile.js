import React, { useEffect, useState } from 'react'
import "./Profile.scss"
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader'
import Card from '../../components/card/Card'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updateUser } from '../../services/authService'
import ChangePassword from '../../components/changePassword/ChangePassword'


const EditProfile = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector(selectUser);
    const { email } = user;
    useEffect(() => {
        if (!email) {
            navigate("/profile")
        }
    }, [email, navigate])

    const initialState = {
        name: user?.name,
        companyName: user?.companyName || "",
        ruc: user?.ruc || "",
        email: user?.email,
        phone: user?.phone,
        bio: user?.bio,
        photo: user?.photo,
    }

    const [profile, setProfile] = useState(initialState);
    const [profileImage, setProfileImage] = useState("");


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0])
    };

    const saveProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let imageURL;
            if (profileImage &&
                (
                    profileImage.type === "image/jpeg" ||
                    profileImage.type === "image/jpg" ||
                    profileImage.type === "image/png"

                )
            ) {
                const image = new FormData()
                image.append("file", profileImage)
                image.append("cloud_name", "dgb7q8yaw")
                image.append("upload_preset", "zdwv0enr")
                // primera imagen que se guardara
                const response = await fetch(
                    "https://api.cloudinary.com/v1_1/dgb7q8yaw/image/upload",
                    { method: "post", body: image}
                );
                const imgData = await response.json()
                imageURL = imgData.url.toString()
            }
            const formData = {
                name: profile.name,
                companyName: profile.companyName,
                ruc: profile.ruc,
                phone: profile.phone,
                bio: profile.bio,
                photo: imageURL || profile.photo,
            }
            await updateUser(formData)
            toast.success("Usuario Actualizado");
            navigate("/profile");
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false)
            toast.error(error.message)
        }
    };

    return (
        <div className='profile --my2'>
            {isLoading && <Loader />}
            <Card cardClass={"card --flex-dir-column"}>
                <span className="profile-photo">
                    <img src={user?.photo} alt="perfil usuario" />
                </span>
                <form className='--form-control --m' onSubmit={saveProfile} >
                    <span className='profile-data'>
                        <p>
                            <label>Nombre:</label>
                            <input type="text" name="name" value={profile?.name} onChange={handleInputChange} />

                        </p>
                        <p>
                            <label>Nombre de la empresa:</label>
                            <input type="text" name="companyName" value={profile?.companyName} onChange={handleInputChange} />
                        </p>
                        <p>
                            <label>RUC:</label>
                            <input type="text" name="ruc" value={profile?.ruc} onChange={handleInputChange} inputMode="numeric" maxLength="11" pattern="[0-9]{11}" />
                        </p>
                        <p>
                            <label>Correo:</label>
                            <input type="text" name="email" value={profile?.email} disabled />
                            <br />
                            <code>El correo no puede ser cambiado</code>

                        </p>
                        <p>

                            <label>Telefono:</label>
                            <input type="text" name="phone" value={profile?.phone} onChange={handleInputChange} />
                        </p>
                        <p>
                            <label>Información:</label>
                        

                            <textarea name="bio" value={profile?.bio} onChange={handleInputChange} cols="30" rows="10"></textarea>
                        </p>
                        <p>
                            <label>Foto:</label>
                            <input type="file" name="image" onChange={handleImageChange} />

                        </p>
                        <div>

                            <button className='--btn --btn-primary'>Editar Perfil</button>

                        </div>


                    </span>
                </form>
            </Card>
            <br/>
            <ChangePassword/>
        </div>
    )
}

export default EditProfile