const Variables = {
    DEFAULT_BORDER_RADIUS: 5,
    MARKER_CONFIG_AREA_WIDTH: 250,

    RE_RENDER_MAP_DISPLAY: "flex",

    CURRENT_MARKER_LABELS: [], // ALLA LABELS SOM SITTER PÅ NURVARANDE MARKERN
    CURRENT_LABEL_FILTERS: [], //ALLA FILTER SOM JUST NU ÄR AKTIVA

    MARKERS: [
        {
            name: "shit",
            description: "smörgås",
            lat: 37.78825,
            lon: -122.4324,
            labels: ["Beach"]
        },
    ],

    LABELS: [
        {
            name: "None",
            p: false,
        },

        {
            name: "Museum",
            p: false,
        },

        {
            name: "Beach",
            p: false,
        },

        {
            name: "Shop",
            p: false,
        },

        {
            name: "House",
            p: false,
        },

        {
            name: "Beauty Spot",
            p: false,
        },

        {
            name: "Park",
            p: false,
        },

        {
            name: "Restaurant",
            p: false,
        },

        {
            name: "WC",
            p: false,
        },

        {
            name: "Playground",
            p: false,
        },

        {
            name: "Other",
            p: false,
        },

        {
            name: "Custom",
            p: false,
        }
    ]
}
export default Variables;