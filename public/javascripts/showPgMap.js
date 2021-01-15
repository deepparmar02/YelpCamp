// const campgrounds = reqre("../../models/campgrounds");

mapboxgl.accessToken = 'pk.eyJ1IjoiZDVwYXJtYXIiLCJhIjoiY2tqczA0ZmZyMTM5eDJ6cDVheDVna2YxNiJ9.ZVjyF7uxX5Z-K57COJ58pQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v11', // stylesheet location
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 8 // starting zoom
});

var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map)