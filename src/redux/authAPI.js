import { toast } from 'sonner';
import api from '../../utils/api';
import { loginSuccess } from './authSlice';

export const loginUser = (form, navigate) => async (dispatch) => {
  try {
    const res = await api.post('/user/login', form);
    dispatch(loginSuccess(res.data));

    if(res.data.success) {
      toast(res.data.message);
      navigate('/dashboard');
    }
  } catch (err) {
    toast(err.response?.data?.error || 'Login failed');
  }
};

export const registerUser = (form, navigate) => async () => {
  try {
    const res = await api.post('/user/register', form);

    if(res.data.success) {
      toast(res.data.message || "Otp sent successfully");
      navigate(`/otp-verification/${form.email}`);
    }

    // navigate(`/otp-verification/${form.email}`);  // that should be our otp page
  } catch (err) {
    toast(err.response?.data?.message || 'Registration failed');
  }
};
