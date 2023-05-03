function ohnoswitch() {
    bb = document.getElementsByTagName("body");
    bb[0].classList.toggle("ohno");

    thing = document.getElementsByTagName("li");
    for (i=0; i<thing.length; i++) {
        thing.item(i).classList.toggle("ohno");
    }
    
    // for photo
    thing = document.getElementsByClassName("swappy");
    for (i=0; i<thing.length; i++) {
        thing.item(i).classList.toggle("ohno");
    }
}
