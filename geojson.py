import json
import pandas as pd

df = pd.read_json("dataset_final.json")

# se parte por el head
output = """{
  "type": "FeatureCollection",
  "features": [
           """
   
template = '''
    { "type" : "Feature",
        "id" : %s,
            "geometry" : {
                "type" : "Point",
                "coordinates" : [%s,%s]},
        "properties" : { "FLAG_TSUNAMI" : "%s", "YEAR" : "%s", "DATE" : "%s",
        "FOCAL_DEPTH" : "%s", "MAGNITUDE" : "%s", "LOCATION_NAME" : "%s",
        "DEATHS": "%s", "DAMAGE": "%s", "HOUSES_DESTROYED" : "%s", "POPULATION" : "%s",
        "PIB" : "%s"}
        },

    '''

for i in range(len(df)):
	output += template % (df.loc[i, "ID"], df.loc[i, "LONGITUDE"], df.loc[i, "LATITUDE"],
		df.loc[i, "FLAG_TSUNAMI"], df.loc[i, "YEAR"], df.loc[i, "DATE"], 
		df.loc[i, "FOCAL_DEPTH"], df.loc[i, "MAGNITUDE"], df.loc[i, "LOCATION_NAME"], 
		df.loc[i, "DEATHS"], df.loc[i, "DAMAGE"], df.loc[i, "HOUSES_DESTROYED"], 
		df.loc[i, "POPULATION"], df.loc[i, "PIB"])



output += \
    ''' 
    ]
}
    '''

outFileHandle = open("output2.geojson", "w")
outFileHandle.write(output)
outFileHandle.close()