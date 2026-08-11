package com.shelfapp.dto;

public class DashboardDTO {
    private long totalRooms;
    private long totalShelves;
    private long totalBoxes;
    private long totalItems;

    public DashboardDTO() {}

    public long getTotalRooms() { return totalRooms; }
    public void setTotalRooms(long totalRooms) { this.totalRooms = totalRooms; }

    public long getTotalShelves() { return totalShelves; }
    public void setTotalShelves(long totalShelves) { this.totalShelves = totalShelves; }

    public long getTotalBoxes() { return totalBoxes; }
    public void setTotalBoxes(long totalBoxes) { this.totalBoxes = totalBoxes; }

    public long getTotalItems() { return totalItems; }
    public void setTotalItems(long totalItems) { this.totalItems = totalItems; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private DashboardDTO dto = new DashboardDTO();
        public Builder totalRooms(long totalRooms) { dto.setTotalRooms(totalRooms); return this; }
        public Builder totalShelves(long totalShelves) { dto.setTotalShelves(totalShelves); return this; }
        public Builder totalBoxes(long totalBoxes) { dto.setTotalBoxes(totalBoxes); return this; }
        public Builder totalItems(long totalItems) { dto.setTotalItems(totalItems); return this; }
        public DashboardDTO build() { return dto; }
    }
}
