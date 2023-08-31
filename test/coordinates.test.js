import assert from "node:assert";
import test from "node:test";

import Coordinates from "../lib/coordinates.js";

test("decimatePoints(): Freehand line", () => {
  const line = new Coordinates(coordinates1);
  const decimatedLine = line.decimatePoints();
  assert.deepStrictEqual(decimatedLine, coordinates2);
});

test("splitLine(): Snaky line", () => {
  const line = new Coordinates(coordinates3);
  const splitPoint = [138.72904560601677, 35.33015567868128, 0];
  const splitLines = line.splitLine(splitPoint);
  assert.deepStrictEqual(splitLines, coordinates4);
});

const coordinates1 = [
  [138.72932913711412, 35.335267869484696, 0],
  [138.7293345015321, 35.335267869484696, 0],
  [138.72933986595007, 35.335267869484696, 0],
  [138.72933986595007, 35.335272245678794, 0],
  [138.72934523036804, 35.335272245678794, 0],
  [138.72934523036804, 35.335272245678794, 0],
  [138.72934523036804, 35.335272245678794, 0],
  [138.72934523036804, 35.335272245678794, 0],
  [138.72935059478607, 35.335272245678794, 0],
  [138.72935059478607, 35.335276621872694, 0],
  [138.72935059478607, 35.335276621872694, 0],
  [138.72935059478607, 35.335276621872694, 0],
  [138.72935595920404, 35.335276621872694, 0],
  [138.72935595920404, 35.33528099806634, 0],
  [138.72936132362207, 35.33528099806634, 0],
  [138.72936668804005, 35.33528537426024, 0],
  [138.72937205245802, 35.33528975045344, 0],
  [138.72938278129396, 35.33528975045344, 0],
  [138.72938814571194, 35.33529412664633, 0],
  [138.7293935101299, 35.33529412664633, 0],
  [138.72939887454788, 35.33529850283905, 0],
  [138.72940960338394, 35.33529850283905, 0],
  [138.72941496780192, 35.33529850283905, 0],
  [138.72941496780192, 35.33529850283905, 0],
  [138.7294203322199, 35.33529850283905, 0],
  [138.7294256966378, 35.33529850283905, 0],
  [138.7294256966378, 35.33529850283905, 0],
  [138.72943106105583, 35.33529850283905, 0],
  [138.72943106105583, 35.33529850283905, 0],
  [138.7294364254738, 35.33529850283905, 0],
  [138.72944178989178, 35.33529850283905, 0],
  [138.72944715430975, 35.33529850283905, 0],
  [138.72944715430975, 35.33529850283905, 0],
  [138.72945251872778, 35.33529850283905, 0],
  [138.72945788314576, 35.33529850283905, 0],
  [138.72946324756379, 35.33529850283905, 0],
  [138.72946861198176, 35.33529850283905, 0],
  [138.72947397639967, 35.33529850283905, 0],
  [138.7294793408177, 35.33529850283905, 0],
  [138.7294793408177, 35.33529850283905, 0],
  [138.72948470523562, 35.33529850283905, 0],
  [138.72949006965365, 35.33529412664633, 0],
  [138.72949006965365, 35.33529412664633, 0],
  [138.72949543407162, 35.33528975045344, 0],
  [138.7295007984896, 35.33528975045344, 0],
  [138.72950616290757, 35.33528975045344, 0],
  [138.7295115273256, 35.33528537426024, 0],
  [138.7295115273256, 35.33528537426024, 0],
  [138.72951689174351, 35.33528099806634, 0],
  [138.72951689174351, 35.33528099806634, 0],
  [138.72952225616154, 35.335276621872694, 0],
  [138.72952225616154, 35.335276621872694, 0],
  [138.72952762057957, 35.335272245678794, 0],
  [138.7295329849975, 35.335272245678794, 0],
  [138.7295329849975, 35.335267869484696, 0],
  [138.72953834941552, 35.335267869484696, 0],
  [138.72953834941552, 35.335267869484696, 0],
  [138.72954371383344, 35.3352634932903, 0],
  [138.72954371383344, 35.3352634932903, 0],
  [138.72954907825147, 35.33525911709573, 0],
  [138.72955444266944, 35.33525911709573, 0],
  [138.7295598070874, 35.33525474090091, 0],
  [138.7295598070874, 35.33525474090091, 0],
  [138.72956517150539, 35.335250364705814, 0],
  [138.72957053592341, 35.335250364705814, 0],
  [138.72957053592341, 35.33524598851048, 0],
  [138.7295759003439, 35.33524598851048, 0],
  [138.7295759003439, 35.335241612314974, 0],
  [138.72958126476186, 35.335241612314974, 0],
  [138.72958126476186, 35.335241612314974, 0],
  [138.72958662917983, 35.335241612314974, 0],
  [138.72958662917983, 35.3352372361192, 0],
  [138.7295919935978, 35.3352372361192, 0],
  [138.7295919935978, 35.3352372361192, 0],
  [138.7295919935978, 35.3352372361192, 0],
  [138.7295919935978, 35.3352372361192, 0],
  [138.7295919935978, 35.3352372361192, 0],
  [138.7295919935978, 35.3352372361192, 0],
];
const coordinates2 = [
  [138.72932913711412, 35.335267869484696, 0],
  [138.72944715430975, 35.33529850283905, 0],
  [138.7295919935978, 35.3352372361192, 0],
];

const coordinates3 = [
  [138.7289275888217, 35.32895651670938, 0],
  [138.72814974820733, 35.329420428194936, 0],
  [138.7274791959535, 35.33020819631763, 0],
  [138.7275489333867, 35.33036574902053, 0],
  [138.72772595918246, 35.33038325485765, 0],
  [138.72836432492835, 35.32980993672645, 0],
  [138.72870228326394, 35.32964800644146, 0],
  [138.72891149556773, 35.32969177141531, 0],
  [138.7289275888217, 35.32985370161259, 0],
  [138.72808001077203, 35.330343866719446, 0],
  [138.72798345124818, 35.330602077499506, 0],
  [138.72811219727777, 35.33066772417715, 0],
  [138.72846088445, 35.33040076069109, 0],
  [138.7291475299578, 35.33010753748566, 0],
  [138.72929773366297, 35.33019944338028, 0],
  [138.72920117413918, 35.330343866719616, 0],
  [138.7288310292957, 35.33045327816744, 0],
  [138.72851452863137, 35.33072024148004, 0],
  [138.72846088445, 35.33097845105864, 0],
  [138.7286647323366, 35.330995956762195, 0],
  [138.7289865974181, 35.33066772417715, 0],
  [138.72959277665387, 35.33050141915807, 0],
];
const coordinates4 = [
  [
    [138.7289275888217, 35.32895651670938, 0],
    [138.72814974820733, 35.329420428194936, 0],
    [138.7274791959535, 35.33020819631763, 0],
    [138.7275489333867, 35.33036574902053, 0],
    [138.72772595918246, 35.33038325485765, 0],
    [138.72836432492835, 35.32980993672645, 0],
    [138.72870228326394, 35.32964800644146, 0],
    [138.72891149556773, 35.32969177141531, 0],
    [138.7289275888217, 35.32985370161259, 0],
    [138.72808001077203, 35.330343866719446, 0],
    [138.72798345124818, 35.330602077499506, 0],
    [138.72811219727777, 35.33066772417715, 0],
    [138.72846088445, 35.33040076069109, 0],
  ],
  [
    [138.7291475299578, 35.33010753748566, 0],
    [138.72929773366297, 35.33019944338028, 0],
    [138.72920117413918, 35.330343866719616, 0],
    [138.7288310292957, 35.33045327816744, 0],
    [138.72851452863137, 35.33072024148004, 0],
    [138.72846088445, 35.33097845105864, 0],
    [138.7286647323366, 35.330995956762195, 0],
    [138.7289865974181, 35.33066772417715, 0],
    [138.72959277665387, 35.33050141915807, 0],
  ],
];