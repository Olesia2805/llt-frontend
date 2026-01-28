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

    // Mock data with ISO date strings to support multi-month trips
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return {
      events: [
        {
          startDate: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-13`,
          endDate: `${currentYear}-${String(currentMonth + 2).padStart(2, "0")}-05`,
          tripId: "1",
          title: "Trip to Kyoto",
          status: "upcoming",
        },
      ],
      upcomingTrips: [
        // {
        //   id: "1",
        //   title: "Trip to Kyoto",
        //   startDate: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-13`,
        //   endDate: `${currentYear}-${String(currentMonth + 2).padStart(2, "0")}-05`,
        //   duration: "7 Days",
        //   travelers: 2,
        // },
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
          coordinates: { lat: 35.0116, lng: 135.7681 },
          status: "upcoming",
          visitDate: "Next Destination",
          daysUntil: 4,
        },
        {
          id: "2",
          name: "Paris",
          country: "FR",
          coordinates: { lat: 48.8566, lng: 2.3522 },
          status: "visited",
          visitDate: "Visited Aug 2023",
        },
        {
          id: "3",
          name: "New York",
          country: "US",
          coordinates: { lat: 40.7128, lng: -74.006 },
          status: "visited",
          visitDate: "Visited May 2023",
        },
        {
          id: "4",
          name: "Rome",
          country: "IT",
          coordinates: { lat: 41.9028, lng: 12.4964 },
          status: "visited",
          visitDate: "Visited Sep 2023",
        },
        {
          id: "5",
          name: "London",
          country: "GB",
          coordinates: { lat: 51.5074, lng: -0.1278 },
          status: "visited",
          visitDate: "Visited Oct 2023",
        },
      ]
    };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch travel history"
    );
  }
};
