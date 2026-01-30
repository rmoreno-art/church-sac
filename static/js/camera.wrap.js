$(document).ready(function() {
    // camera
       $('#camera_wrap').camera({
           //thumbnails: true
           autoAdvance			: true,		
           mobileAutoAdvance	: true,
           height: '43%',
           hover: false,
           loader: 'none',
           navigation: false,
           navigationHover: false,
           mobileNavHover: false,
           playPause: false,
           pauseOnClick: false,
           pagination: true,
           time: 7000,
           transPeriod: 1000,
           minHeight: '150px'
       });
   });
   $(window).load(function() {
   });