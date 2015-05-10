var Crunch = React.createClass({
  loadTaskFromServer: function(repeat) {
    console.log('in loadTaskFromServer');
    $.ajax({
      url: '/api/crunch',
      method: 'GET',
      dataType: 'json',
      success: function(task) {
        var context = this;

        // check to see if web workers are supported by the browser
        if (!!window.Worker) {
          // save the stringified algorithm retrieved from the server
          var alg = task.result.alg;
          // save the data set retrieved from the server 
          var data = task.result.data;

          // initialize new web worker
          var myWorker = new Worker('worker.js');

          // send the algorithm and data to the webworker
          myWorker.postMessage([alg, data]);

          // change to screensaver page once web worker gets data
          window.location.hash = '#screensaver';

          myWorker.onmessage = function (e) {
            console.log('Web worker donezo: ', e.data);

            // add ajax post request call here
            console.log(context);
            context.sendResultToServer();
            // terminate webworker on completion of its job
            myWorker.terminate();

            // check to see if we want to repeat get request forever
            if (repeat) {
              context.loadTaskFromServer(true);
            } else {
              // switch back to crunch page on completion of web worker
              window.location.hash = '#crunch';
            }
          };
          
        }

      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/crunch', status, err.toString());
      }.bind(this)
    });    
  },

  sendResultToServer: function (result) {
    $.ajax({
      url: '/api/crunch',
      method: 'POST',
      dataType: 'json',
      data: JSON.stringify(result),
      success: function(res) {
        console.log('Result POSTed to server: ', res);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/crunch', status, err.toString());
      }.bind(this)
    });
  },


  render: function() {
    return (
      <div>
        <a href='#'>Home</a>
        <button onClick={this.loadTaskFromServer.bind(this, false)}>Crunch Once</button>
        <button onClick={this.loadTaskFromServer.bind(this, true)}>Crunch Forever</button>
      </div>
    );
  }
});

var ScreenSaver = React.createClass({
  render: function() {
    return (
      <iframe width={window.innerWidth} height={window.innerHeight} src='./screensaver/sprites.html'></iframe>
    );
  }
});