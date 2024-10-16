import axiosInstance from "../interceptors/axios-config";
const url='http://localhost:5000/api/v1';

export const getScores = (designation, training) => {
    return axiosInstance.get(`${url}/admin/scores?designation=${designation}&training_id=${training}`)
}

export const getTraining = () => {
    return axiosInstance.get(`${url}/admin/training`)
}

export const getDashTableData = () => {
    return axiosInstance.get(`${url}/admin/cummulative`)
}

export const getDashBarData = () => {
    return axiosInstance.get(`${url}/admin/training/scores`)
}

export const getRetentionData = () => {
    return axiosInstance.get(`${url}/admin/retention/all`)
}

export const deletePerformanceScores = (emp_id, training_id) => {
    return axiosInstance.delete(`${url}/admin/scores?emp_id=${emp_id}&training_id=${training_id}`)
}

export const getDashPieData = () => {
    return axiosInstance.get(`${url}/admin/designation/scores`)
}



//feedback
export const getFeedbackTableData = () => {
    return axiosInstance.get(`${url}/employee/feedback`)
}

export const updateFeedback = (data) => {
    return axiosInstance.put(`${url}/employee/feedback`, data)
}