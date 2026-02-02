import { getUserTrips } from "./trips.api";

export const getDashboardData = async (userId) => {
  try {
    const trips = await getUserTrips(userId);
    const now = new Date();

    const stats = trips.reduce(
      (acc, trip) => {
        acc.totalTrips += 1;
        const start = new Date(trip.startDate);
        const end = new Date(trip.endDate);

        if (now >= start && now <= end) {
          acc.activeTrips += 1;
        } else if (now < start) {
          acc.futureTrips = (acc.futureTrips || 0) + 1;
          acc.activeTrips += 1; 
        } else if (now > end) {
          acc.completedTrips += 1;
        }
        return acc;
      },
      { totalTrips: 0, completedTrips: 0, activeTrips: 0 }
    );

    // 2. Prepare Calendar Data
    const events = trips.map((trip) => ({
      startDate: trip.startDate,
      endDate: trip.endDate,
      tripId: trip.id,
      title: trip.title,
      status: trip.status === "draft" ? "upcoming" : trip.status,
    }));

    const upcomingTrips = trips
      .filter((trip) => new Date(trip.startDate) > now)
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
      .map((trip) => {
        const start = new Date(trip.startDate);
        const end = new Date(trip.endDate);
        const durationDays =
          Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

        return {
          id: trip.id,
          title: trip.title,
          startDate: trip.startDate,
          endDate: trip.endDate,
          duration: `${durationDays} Days`,
        };
      });

    const calendarData = { events, upcomingTrips };

    // 3. Prepare Travel History (Cities for Map)
    const cities = trips.map((trip) => {
      const start = new Date(trip.startDate);
      const end = new Date(trip.endDate);
      let status = "visited";
      let visitDate = `Visited ${start.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })}`;

      if (now < start) {
        status = "upcoming";
        const daysUntil = Math.ceil((start - now) / (1000 * 60 * 60 * 24));
        visitDate = "Next Destination";
        trip.daysUntil = daysUntil;
      } else if (now >= start && now <= end) {
        status = "upcoming"; // Active trips can be treated as current/next destinations
        visitDate = "Current Trip";
      }

      return {
        id: trip.id,
        name: trip.originCity || "Unknown",
        country: null, // Geocoding happens in the DashboardMap component
        coordinates: {
          lat: parseFloat(trip.originLat),
          lng: parseFloat(trip.originLng),
        },
        status,
        visitDate,
        daysUntil: trip.daysUntil,
        title: trip.title,
      };
    });

    const travelData = { cities };

    return {
      stats,
      calendarData,
      travelData,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to fetch dashboard data");
  }
};
