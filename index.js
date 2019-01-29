var courses = [];

fetch("https://canvas.uw.edu/api/v1/courses?per_page=100")
  .then(res => res.text())
  .then(res => {
    courses = JSON.parse(res.substr(9, res.length));
    courses = courses
      .filter(c => c.course_code)
      .filter(
        c =>
          (!c.end_at || new Date(c.end_at) >= Date.now()) &&
          new Date(c.start_at) >= Date.now() - 1000 * 60 * 60 * 24 * 90
      );
    var htmlString = "";
    for (let i = 0; i < courses.length; i++) {
      const c = courses[i];
      htmlString += `<button id="${c.id}"> ${c.course_code}</button>`;
    }

    var divObject = document.createElement("div");
    divObject.id = "buttons";
    divObject.innerHTML = htmlString;
    document.getElementById("application").appendChild(divObject);

    //set up event handlers
    for (let i = 0; i < courses.length; i++) {
      const c = courses[i];
      document.getElementById(c.id).onclick = e => {
        window.location = `https://canvas.uw.edu/courses/${c.id}`;
      };
    }
  });
