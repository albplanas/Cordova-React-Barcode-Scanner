

function onBarCodeScanner(pars){
      
    var  params={
         'prompt_message':pars.sms, // Change the info message. A blank message ('') will show a default message
         'orientation_locked':pars.orientation, // Lock the orientation screen
         'camera_id':pars.camera, // Choose the camera source
         'beep_enabled':pars.beep, // Enables a beep after the scan
         'scan_type':pars.scan, // Types of scan mode: normal = default black with white background / inverted = white bars on dark background / mixed = normal and inverted modes
         'barcode_formats':pars.barcode, // Put a list of formats that the scanner will find. A blank list ([]) will enable scan of all barcode types
         'extras':pars.extras // Additional extra parameters. See [ZXing Journey Apps][1] IntentIntegrator and Intents for more details
     }
     window.plugins.zxingPlugin.scan(params, onSuccess, onFailure)
     function  onSuccess(s){
         alert(s)
     }
     function  onFailure(s){
         console.log(s)
     }
 }
 
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
     
    },

    
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        

      

        document.getElementById("demo").onclick = function() {

            var  pars={
                sms:'Scan a barcode', // Change the info message. A blank message ('') will show a default message
                orientation:true, // Lock the orientation screen
                camera:0, // Choose the camera source
                beep:true, // Enables a beep after the scan
                scan_type:'normal', // Types of scan mode: normal = default black with white background / inverted = white bars on dark background / mixed = normal and inverted modes
                barcode:[], // Put a list of formats that the scanner will find. A blank list ([]) will enable scan of all barcode types
                extras:{} // Additional extra parameters. See [ZXing Journey Apps][1] IntentIntegrator and Intents for more details
           }
           onBarCodeScanner(pars);
          
        };
    
    }
};

app.initialize();

