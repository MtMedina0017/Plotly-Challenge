getPlots(940);

function getPlots(subjectId) {
    //Read samples.json
    console.log("infunction")
        d3.json("../Data/samples.json").then (subjectdata =>{
            var result = subjectdata.metadata.filter(meta => meta.id == subjectId)[0];
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

            console.log(subjectdata)
            var sample = subjectdata.samples.filter(d =>d.id == subjectId)
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
        })};
        
            // gauge
            function bonusPlot(wfreq) {
                //Read samples.json
                console.log("infunction")
                    // d3.json("../Data/samples.json").then (subjectdata =>{
                    //     var result = subjectdata.metadata.filter(meta => meta.id == subjectId)[0];
                    //     var subject = result.wfreq
            // var gaugeDiv = wfreq.subjectId("gauge");

            var traceA = {
            domain: {x: [0-1], y: [0-1]},
            value:  wfreq,
            type:  "indicator",
            mode:  "gauge",
            gauge:  {axis: {range: [0,9]},
            
            steps:  [{range: [0,2], color: "red"},
            {range: [2,4], color: "orange"},
            {range: [4,6], color: "yellow"},
            {range: [6,8], color: "lightgreen"},
            {range: [8,10], color: "aquagreen"}]
        }, title: 'Number of Belly Button Washes Per Week'

            };
            
            var data = [traceA];
            
            Plotly.plot("gauge", data);
    
    };

    function getDemoInfo(id) {

        d3.json("../Data/samples.json").then((data)=> {
            var metadata = data.metadata;
            console.log(metadata)
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
           var washingFreq=result.wfreq
           var subjectInfo = d3.select("#sample-metadata");
           subjectInfo.html("");
    
            Object.entries(result).forEach((key) => {   
                subjectInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
            bonusPlot(washingFreq)

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
            optionChanged(data.names[0])
        });

    }

    init();
