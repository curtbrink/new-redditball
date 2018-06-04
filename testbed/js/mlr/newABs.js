var URL = "https://sheets.googleapis.com/v4/spreadsheets/1WIceK8UHx_BGt0JcI5YDUVNQhEoOqy5Mt4fY3zpa7Gg/values:batchGet?ranges='Fastball'!A3%3AM20&ranges='Fastball'!A26%3AM43&ranges='Breaking%20Ball'!A3%3AM20&ranges='Breaking%20Ball'!A26%3AM43&key=AIzaSyBwqi6e_o1xg7pnJjyG3pnUa9MsWEXksgQ"

$.ajax({ url: URL }).done(handleNewABData)

var results_dict = {
    'fastball': {
        'correct': {
            'neutral': {
                'balanced': {
                    'same': [],
                    'different': []
                },
                'strikeout': {
                    'same': [],
                    'different': []
                },
                'finesse': {
                    'same': [],
                    'different': []
                }
            },
            'power': {
                'balanced': {
                    'same': [],
                    'different': []
                },
                'strikeout': {
                    'same': [],
                    'different': []
                },
                'finesse': {
                    'same': [],
                    'different': []
                }
            },
            'contact': {
                'balanced': {
                    'same': [],
                    'different': []
                },
                'strikeout': {
                    'same': [],
                    'different': []
                },
                'finesse': {
                    'same': [],
                    'different': []
                }
            }
        },
        'incorrect': {
            'neutral': {
                'balanced': {
                    'same': [],
                    'different': []
                },
                'strikeout': {
                    'same': [],
                    'different': []
                },
                'finesse': {
                    'same': [],
                    'different': []
                }
            },
            'power': {
                'balanced': {
                    'same': [],
                    'different': []
                },
                'strikeout': {
                    'same': [],
                    'different': []
                },
                'finesse': {
                    'same': [],
                    'different': []
                }
            },
            'contact': {
                'balanced': {
                    'same': [],
                    'different': []
                },
                'strikeout': {
                    'same': [],
                    'different': []
                },
                'finesse': {
                    'same': [],
                    'different': []
                }
            }
        }
    },
    'breaking': {
        'correct': {
            'neutral': {
                'balanced': {
                    'same': [],
                    'different': []
                },
                'strikeout': {
                    'same': [],
                    'different': []
                },
                'finesse': {
                    'same': [],
                    'different': []
                }
            },
            'power': {
                'balanced': {
                    'same': [],
                    'different': []
                },
                'strikeout': {
                    'same': [],
                    'different': []
                },
                'finesse': {
                    'same': [],
                    'different': []
                }
            },
            'contact': {
                'balanced': {
                    'same': [],
                    'different': []
                },
                'strikeout': {
                    'same': [],
                    'different': []
                },
                'finesse': {
                    'same': [],
                    'different': []
                }
            }
        },
        'incorrect': {
            'neutral': {
                'balanced': {
                    'same': [],
                    'different': []
                },
                'strikeout': {
                    'same': [],
                    'different': []
                },
                'finesse': {
                    'same': [],
                    'different': []
                }
            },
            'power': {
                'balanced': {
                    'same': [],
                    'different': []
                },
                'strikeout': {
                    'same': [],
                    'different': []
                },
                'finesse': {
                    'same': [],
                    'different': []
                }
            },
            'contact': {
                'balanced': {
                    'same': [],
                    'different': []
                },
                'strikeout': {
                    'same': [],
                    'different': []
                },
                'finesse': {
                    'same': [],
                    'different': []
                }
            }
        }
    }
}

function handleNewABData() {
    var newRanges = arguments[0].valueRanges;
    // newRanges 0 = correct fast
    // newRanges 1 = incorrect fast
    // newRanges 2 = correct breaking
    // newRanges 3 = incorrect breaking
    var columns = ["HR", "3B", "2B", "1B", "BB", "FO", "K", "PO", "RGO", "LGO"];
    for (i = 0; i < 4; i++) {
        var range = newRanges[i];
        //var obj;
        for (j = 0; j < 18; j++) {
            var row = range.values[j];
            //var rangeObj = obj[row[0]][row[1]][row[2]];

            for (k = 0; k < 10; k++) {
                var numberRange = row[k+3];
                switch (i) {
                    case 0: results_dict['fastball']['correct'][row[0]][row[1]][row[2]].push(createRangeObject(numberRange, columns[k]));
                    case 1: results_dict['fastball']['incorrect'][row[0]][row[1]][row[2]].push(createRangeObject(numberRange, columns[k]));
                    case 2: results_dict['breaking']['correct'][row[0]][row[1]][row[2]].push(createRangeObject(numberRange, columns[k]));
                    case 3: results_dict['breaking']['incorrect'][row[0]][row[1]][row[2]].push(createRangeObject(numberRange, columns[k]));
                }
            }
        }
    }
}

function createRangeObject(numberRange, result) {
    // numberRange = e.g. "2 - 25"
    // result = e.g. "HR"
    var parsed = numberRange.split(' - ');
    return {
        'start_number': parsed[0],
        'end_number': parsed[1],
        'result': result
    }
}