import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { getProfile, logout, email } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      if (data) {
        setProfile(data);
      }
    };

    fetchProfile();
  }, [getProfile]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!profile) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Perfil de Usuario</h2>
      <p>Email: {profile.email || email}</p> {/* Mostrar el email */}
      <button className="btn btn-danger" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Profile;
