getPlots(940);

function getPlots(selectedId) {
    //Read samples.json
    console.log("infunction")
        d3.json("../Data/samples.json").then (sampledata =>{
            var result = sampledata.metadata.filter(meta => meta.id == selectedId)[0];
            var wfreq = result.wfreq

            // wfreqgauge = []
            
            // var sum = 0;

            //     for (var i = 0; i < wfreq.length;i ++) {

            //         var entry = [wfreq[i]]

            //         wfreqgauge.push(wfreq[i])

            //         sum= sum + wfreq[i]
            //         console.log(i,wfreq[i])
            //     }
            //     wfreqgauge.push(sum)
            //     wfreq.push (300)

            // console.log(wfreqgauge, "wfreqgauge values")

            console.log(sampledata)
            var sample = sampledata.samples.filter(d =>d.id == selectedId)
            var ids = sample[0].otu_ids;
            console.log(ids)
            var sampleValues =  sample[0].sample_values.slice(0,10).reverse();
            console.log(sampleValues)
            var labels =  sample[0].otu_labels.slice(0,10);
            console.log (labels)

            var OTU_top = ( sample[0].otu_ids.slice(0, 10)).reverse();

            var OTU_id = OTU_top.map(d => "OTU " + d);
            console.log(`OTU IDS: ${OTU_id}`)

            var labels =  sample[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                marker: {
                color: '#337ab7'},
                type:"bar",
                orientation: "h",
            };
            // create data variable
            var data = [trace];
    
            // create layout variable to set plots layout
            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
            };

            Plotly.newPlot("bar", data, layout);
            
            // bubble
            var trace1 = {
                x: sample[0].otu_ids,
                y: sample[0].sample_values,
                mode: "markers",
                marker: {
                    size: sample[0].sample_values,
                    color: sample[0].otu_ids
                },
                text:  sample[0].otu_labels
    
            };
    
            // bubble layout
            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000,
                color: OTU_id
            };
    
            var data1 = [trace1];
    
        Plotly.newPlot("bubble", data1, layout_2); 
        
        
            // gauge
    
            // var gaugeDiv = wfreq.selectedId("gauge");

            var traceA = {
            type: "pie",
            showlegend: false,
            hole: 0.4,
            rotation: 185,
            values: parseFloat(wfreq),
            // values: [100 / 5, 100 / 5, 100 / 5, 100 / 5, 100 / 5, 100],
            text: ["Gross", "Eww", "Eh", "Good", "Excellent", ""],
            direction: "clockwise",
            textinfo: "text",
            textposition: "inside",
            marker: {
                colors: ["rgba(255, 0, 0, 0.6)", "rgba(255, 165, 0, 0.6)", "rgba(255, 255, 0, 0.6)", "rgba(144, 238, 144, 0.6)", "rgba(154, 205, 50, 0.6)", "white"]
            },
            labels: ["0-2", "2-4", "4-6", "6-8", "8+", ""],
            hoverinfo: "label"
            };
            
            var degrees = 115, radius = .6;
            var radians = degrees * Math.PI / 180;
            var x = -1 * radius * Math.cos(radians);
            var y = radius * Math.sin(radians);
            
            // guage layout
            var layout = {
            shapes:[{
                type: 'path',
                
                x0: 0,
                y0: 0,
                x1: x,
                y1: 0.5,
                line: {
                    color: 'black',
                    width: 8
                }
                }],
            title: 'Number of Belly Button Washes Per Week',
            xaxis: {visible: false, range: [-1, 1]},
            yaxis: {visible: false, range: [-1, 1]}
            };
            
            var data = [traceA];
            
            Plotly.plot("gauge", data, layout);
    
    });
}
    function getDemoInfo(id) {

        d3.json("../Data/samples.json").then((data)=> {

            var metadata = data.metadata;
    
            console.log(metadata)
    
           var result = metadata.filter(meta => meta.id.toString() === id)[0];

           var demographicInfo = d3.select("#sample-metadata");
            
           demographicInfo.html("");
    
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }
    
    function init() {

        var dropdown = d3.select("#selDataset");
    
        // read the data 
        d3.json("../Data/samples.json").then((data)=> {
            console.log(data)
    
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            getPlots(data.names[0]);
            getDemoInfo(data.names[0]);
        });

    }

    init();
