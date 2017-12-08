var closeCourse;
var currentCourse;
var local_obj = {latitude: 40.4436, longitude: -111.86311, radius: 100};
var numHoles;
var numplayers = 4;


function loadMe() {
    $.post("https://golf-courses-api.herokuapp.com/courses/", local_obj, function (data, status) {
        closeCourse = JSON.parse(data);
        console.log(closeCourse);
        for (let p in closeCourse.courses) {
            $(".dropdown-menu").append("<div class='courselist'>" +
                "<a onclick='informationOpening(" + p + "," + closeCourse.courses[p].id + ")'> " + closeCourse.courses[p].name + "</a>" +
                "</div>");
        }
    });
}

function informationOpening(p, myid) {
    $("#infoboxstuff").empty().append("<div>" + closeCourse.courses[p].name + "</div>");
    $("#infoboxstuff").append("<div>" + closeCourse.courses[p].addr_1 + "</div>");
    $("#infoboxstuff").append("<div>" + closeCourse.courses[p].city + ', ' + closeCourse.courses[0].state_or_province + "</div>");
    $("#infoboxstuff").append("<div>" + closeCourse.courses[p].country + "</div>");
    $("#infoboxstuff").append("<div>" + closeCourse.courses[p].phone + "</div>");
    $("#infoboxstuff").append("<div><a href='" + closeCourse.courses[p].website + "'>Website</a></div>");
    $("#infoboxstuff").append("<div>" + closeCourse.courses[p].hole_count + ' holes' + "</div>");
    $("#infoboxstuff").append("<div ><img class='info' src='" + closeCourse.courses[p].thumbnail + "'></div>");
    getCourse(myid);


}

function getCourse(courseId) {
    console.log('courseId');
    $("#teeselect").html("");
    $.get("https://golf-courses-api.herokuapp.com/courses/" + courseId, function (data, status) {
        currentCourse = JSON.parse(data);
        console.log(data);
        for (let t in currentCourse.course.tee_types) {
            var teename = currentCourse.course.tee_types[t].tee_type;
            console.log(teename);
            $("#teeselect").append("<option value ='" + t + "'>" + teename + " </option>")
        }

    });

}

// holes par and yards and handicap section
function buildCard(mytee) {
    numHoles = currentCourse.course.holes;
    $(".scorecolumn").html("");
    $(".playercolumn").html("<div class='hpyh'><div>Holes</div><div>Par</div><div>Yards</div><div>Handicap</div> </div>");
    for (var c in numHoles) {
        var holepar = currentCourse.course.holes[c].tee_boxes[mytee].par;
        var holeyards = currentCourse.course.holes[c].tee_boxes[mytee].yards;
        var holehcp = currentCourse.course.holes[c].tee_boxes[mytee].hcp;

        console.log(holepar);
        $(".scorecolumn").append("<div id='golumn" + (Number(c) + 1) + "'class='golumn'><div class='holeheader'><div class='parbox'></div> " + (Number(c) + 1) + "</div><div>" + holepar + "</div><div class='yards'>" + holeyards + "</div><div class='hcp'>" + holehcp + "</div></div></div>");
    }

    $(".scorecolumn").append("<div class='totalc'><div>total</div></div>");
    fillCard();
}


function fillCard() {
    // $(".playercolumn").empty();
    // $(".holeinput").empty();
    $('.player').remove()
    $('.holeinput').remove()
    for (let p = 1; p <= numplayers; p++) {
        console.log(p);
        $(".playercolumn").append("<div id='pl" + p + "' class='player delete'><span class='fa fa-minus-circle' onclick='deleteplayer(" + p + ")'></span>" + "<div class='person' contenteditable='true'>Player</div>");
        // $(".playercolumn").append("<div id='pl"+p+"' class=add><span class='fa fa-plus-circle' onclick='addplayer(" + p + ")'></span>" + "<div class='person' contenteditable='true'>Player</div>");
        $(".totalc").append("<input class='holeinput ' id='totalhole" + p + "'>");
        for (let h = 1; h <= numHoles.length; h++) {
            $("#golumn" + h).append("<input id='player" + p + "hole" + h + "' class='holeinput' onkeyup='updating(" + p + ")'>");

        }
    }
}

function deleteplayer(playerId) {
    $("#pl" + playerId).remove();
    for (var j = 1; j <= numHoles.length; j++) {
        $("#player" + playerId + "hole" + j).remove();
        $("#totalhole" + playerId).remove();

    }
    numplayers--;
}

function addplayer(playerId) {
    // $("#pl" + playerId).remove();
    // for (var j = 1; j <= numHoles.length; j++) {
    //     $("#player" + playerId + "hole" + j).add();
    //
    // }

    numplayers++;
    fillCard();
}

function updating(playerid) {
    var playertotal = 0;
    for (let t = 1; t <= numHoles.length; t++) {
        playertotal += Number($("#player" + playerid + "hole" + t).val());
    }

    $("#totalhole" + playerid).val(playertotal);

}
