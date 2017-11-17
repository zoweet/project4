

var closeCourse;
var local_obj = {latitude: 40.4436, longitude: - 111.86311, radius: 48.2803};

function loadMe() {
    $.post("https://golf-courses-api.herokuapp.com/courses", local_obj, function (data, status) {
        closeCourse = JSON.parse(data);
        for (var p in closeCourse.courses){
            $(".dropdown-menu").append("<div class='courselist'>" +
                "<a href=''>"+ closeCourse.courses[p].name +"</a>" +
                "</div>");
        }
        $(".infoboxstuff").append("<div>"+ closeCourse.courses[n].name +"</div>");
        $(".infoboxstuff").append("<div>"+ closeCourse.courses[n].addr_1 +"</div>");
        $(".infoboxstuff").append("<div>"+ closeCourse.courses[n].city +', '+ closeCourse.courses[0].state_or_province + "</div>");
        $(".infoboxstuff").append("<div>"+ closeCourse.courses[n].country +"</div>");
        $(".infoboxstuff").append("<div>"+ closeCourse.courses[n].hole_count +"</div>");
        $(".infoboxstuff").append("<div>"+ closeCourse.courses[n].phone+"</div>");


    })
}