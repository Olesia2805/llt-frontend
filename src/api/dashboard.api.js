// import api from "./api";

export const getDashboardStats = async (userId) => {
  try {
    // TODO: Replace with real API call
    // const { data } = await api.get(`/users/${userId}/dashboard/stats`);
    // return data.data;

    // Mock data
    return {
      totalTrips: 24,
      completedTrips: 18,
      activeTrips: 6,
    };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch dashboard stats"
    );
  }
};

export const getDashboardCalendar = async (userId) => {
  try {
    // TODO: Replace with real API call
    // const { data } = await api.get(`/users/${userId}/dashboard/calendar`);
    // return data.data;

    // Mock data - current month with some trip events
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return {
      currentMonth: currentMonth,
      currentYear: currentYear,
      events: [
        {
          date: 6,
          type: "departure",
        },
        {
          startDate: 13,
          endDate: 17,
          tripId: "1",
          title: "Trip to Kyoto",
          status: "upcoming",
        },
      ],
      upcomingTrips: [
        {
          id: "1",
          title: "Trip to Kyoto",
          startDate: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-13`,
          endDate: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-17`,
          duration: "7 Days",
          travelers: 2,
        },
      ],
    };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch calendar data"
    );
  }
};

export const getTravelHistory = async (userId) => {
  try {
    // TODO: Replace with real API call
    // const { data } = await api.get(`/users/${userId}/dashboard/travel-history`);
    // return data.data;

    // Mock data
    return {
      cities: [
        {
          id: "1",
          name: "Kyoto",
          country: "JP",
          position: { top: "40%", right: "20%" },
          status: "upcoming",
          visitDate: "Next Destination",
        },
        {
          id: "2",
          name: "Paris",
          country: "FR",
          position: { top: "35%", left: "45%" },
          status: "visited",
          visitDate: "Visited Aug 2023",
        },
        {
          id: "3",
          name: "New York",
          country: "US",
          position: { top: "42%", left: "25%" },
          status: "visited",
          visitDate: "Visited May 2023",
        },
      ],
      stats: {
        citiesVisited: 42,
        countriesVisited: 12,
      },
    };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch travel history"
    );
  }
};
