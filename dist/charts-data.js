// Displayed means and vector-derived error extents from the paper PDFs.
// See scripts/extract-chart-data.py for provenance and validation.
window.RoboPromptChartData = {
  "successDomain": [
    0,
    115
  ],
  "steeringDomain": [
    -0.5,
    5.5
  ],
  "sets": {
    "tasks": {
      "source": "dagger_main.pdf",
      "sha256": "5cd4669d821d26dd1aef94667af84636f1bc97ea46315e1a1ef6242e3534afd7",
      "panels": [
        {
          "title": "Insert Bread",
          "rounds": [
            "No Steer",
            "0",
            "1",
            "2"
          ],
          "success": [
            {
              "value": 59.5,
              "low": 34.64,
              "high": 84.359992
            },
            {
              "value": 86.7,
              "low": 66.064064,
              "high": 107.33128
            },
            {
              "value": 95.3,
              "low": 83.519536,
              "high": 107.036016
            },
            {
              "value": 100,
              "low": 100.000003,
              "high": 100.000003
            }
          ],
          "steering": [
            null,
            {
              "value": 2.72,
              "low": 1.368489,
              "high": 4.073371
            },
            {
              "value": 1.39,
              "low": 0.381202,
              "high": 2.396575
            },
            {
              "value": 0.19,
              "low": -0.2022,
              "high": 0.583153
            }
          ]
        },
        {
          "title": "Hang Cup",
          "rounds": [
            "No Steer",
            "0",
            "1",
            "2"
          ],
          "success": [
            {
              "value": 39.6,
              "low": 19.799996,
              "high": 59.399998
            },
            {
              "value": 67.7,
              "low": 43.554883,
              "high": 91.836416
            },
            {
              "value": 80.5,
              "low": 53.471075,
              "high": 107.497665
            },
            {
              "value": 88.1,
              "low": 71.883032,
              "high": 104.316965
            }
          ],
          "steering": [
            null,
            {
              "value": 2.76,
              "low": 1.37484,
              "high": 4.146899
            },
            {
              "value": 2.62,
              "low": 1.272918,
              "high": 3.977082
            },
            {
              "value": 2.75,
              "low": 1.413026,
              "high": 4.086974
            }
          ]
        },
        {
          "title": "Push Ball",
          "rounds": [
            "No Steer",
            "0",
            "1",
            "2"
          ],
          "success": [
            {
              "value": 26.4,
              "low": 9.569998,
              "high": 43.230001
            },
            {
              "value": 85.6,
              "low": 59.871746,
              "high": 111.271102
            },
            {
              "value": 93,
              "low": 79.252273,
              "high": 106.747719
            },
            {
              "value": 98.4,
              "low": 91.140352,
              "high": 105.621545
            }
          ],
          "steering": [
            null,
            {
              "value": 3.09,
              "low": 1.585782,
              "high": 4.585646
            },
            {
              "value": 2.97,
              "low": 1.676137,
              "high": 4.26504
            },
            {
              "value": 1.86,
              "low": 0.820403,
              "high": 2.893883
            }
          ]
        }
      ]
    },
    "policies": {
      "source": "dagger_new.pdf",
      "sha256": "e6e512790a8f005651b4df85c178ba03b33bf40e183c388e562796e3dc8c1ee3",
      "panels": [
        {
          "title": "π₀.₅",
          "rounds": [
            "0",
            "1",
            "2"
          ],
          "success": [
            {
              "value": 86.7,
              "low": 66.07,
              "high": 107.330005
            },
            {
              "value": 95.3,
              "low": 83.520003,
              "high": 107.039988
            },
            {
              "value": 100,
              "low": 100.000003,
              "high": 100.000003
            }
          ],
          "steering": [
            {
              "value": 2.72,
              "low": 1.37,
              "high": 4.07
            },
            {
              "value": 1.39,
              "low": 0.38,
              "high": 2.4
            },
            {
              "value": 0.19,
              "low": -0.2,
              "high": 0.58
            }
          ]
        },
        {
          "title": "DP",
          "rounds": [
            "0",
            "1",
            "2",
            "3"
          ],
          "success": [
            {
              "value": 63.6,
              "low": 23.090002,
              "high": 104.129999
            },
            {
              "value": 83.1,
              "low": 58.219995,
              "high": 107.980002
            },
            {
              "value": 94.9,
              "low": 82.76,
              "high": 107.039988
            },
            {
              "value": 98.4,
              "low": 91.139991,
              "high": 105.619995
            }
          ],
          "steering": [
            {
              "value": 2.36,
              "low": 1.13,
              "high": 3.59
            },
            {
              "value": 2.15,
              "low": 0.84,
              "high": 3.46
            },
            {
              "value": 1.25,
              "low": -0.01,
              "high": 2.51
            },
            {
              "value": 0.24,
              "low": -0.29,
              "high": 0.77
            }
          ]
        },
        {
          "title": "FastWAM",
          "rounds": [
            "0",
            "1",
            "2"
          ],
          "success": [
            {
              "value": 78.4,
              "low": 49.099997,
              "high": 107.659995
            },
            {
              "value": 86.5,
              "low": 60.139994,
              "high": 112.879993
            },
            {
              "value": 94.3,
              "low": 77.330001,
              "high": 111.18999
            }
          ],
          "steering": [
            {
              "value": 2.72,
              "low": 1.22,
              "high": 4.22
            },
            {
              "value": 2.1,
              "low": 0.46,
              "high": 3.74
            },
            {
              "value": 0.98,
              "low": 0.06,
              "high": 1.9
            }
          ]
        }
      ]
    }
  }
};
