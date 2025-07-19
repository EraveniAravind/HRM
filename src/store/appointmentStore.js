import { create } from 'zustand';

const useAppointmentStore = create((set) => ({
  appointments: [],
  addAppointment: (appointment) =>
    set((state) => ({
      appointments: [...state.appointments, appointment],
    })),
  getDoctorStats: () => {
    return useAppointmentStore
      .getState()
      .appointments.reduce((stats, appt) => {
        stats.totalConsultations += 1;
        stats.doctorEarnings += appt.fee * 0.6;
        return stats;
      }, { totalConsultations: 0, doctorEarnings: 0 });
  },
  getHospitalStats: () => {
    return useAppointmentStore
      .getState()
      .appointments.reduce((stats, appt) => {
        stats.totalRevenue += appt.fee * 0.4;
        return stats;
      }, { totalRevenue: 0 });
  },
}));
export default useAppointmentStore;
