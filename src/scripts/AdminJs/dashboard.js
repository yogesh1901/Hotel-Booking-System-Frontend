// Replaces the old event listeners for booking actions

function openModal(type) {
    document.getElementById("modalOverlay").classList.remove("hidden");
  
    if (type === "view") {
      document.getElementById("viewModal").classList.remove("hidden");
    } else if (type === "edit") {
      document.getElementById("editModal").classList.remove("hidden");
    } else if (type === "delete") {
      document.getElementById("deleteModal").classList.remove("hidden");
    }
  }
  
  function closeModal() {
    document.getElementById("modalOverlay").classList.add("hidden");
    document.getElementById("viewModal").classList.add("hidden");
    document.getElementById("editModal").classList.add("hidden");
    document.getElementById("deleteModal").classList.add("hidden");
  }
  
  function confirmDelete() {
    alert("Booking deleted successfully!");
    closeModal();
  }
  
  document.querySelectorAll(".edit-booking").forEach(btn => {
    btn.addEventListener("click", () => openModal("edit"));
  });
  
  document.querySelectorAll(".view-booking").forEach(btn => {
    btn.addEventListener("click", () => openModal("view"));
  });
  
  document.querySelectorAll(".delete-booking").forEach(btn => {
    btn.addEventListener("click", () => openModal("delete"));
  });
  
  // Optional: handle form submit (edit)
  document.getElementById("editBookingForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Booking updated successfully!");
    closeModal();
  });
  