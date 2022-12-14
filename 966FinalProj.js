// This file contains the WebPPL Code used for Cole Kingston and Preston Hess's final project for 9.660, Computational Cognitive Science at MIT
var makeModel = function(f) {return function() {
	var person = mem(function(agent){uniformDraw(['student', 'professor', 'facilities'])})
    var distance = mem(function(agent){uniformDraw([1, 5, 10])})

    var owns_BP = function(agent) {
      if (person(agent) == 'student' && distance(agent) == 1) {
        return flip(.6586);
      } else if (person(agent) == 'student' && distance(agent) == 5) {
        return flip(.3503);
      } else if (person(agent) == 'student' && distance(agent) == 10) {
        return flip(.313);
      } else if (person(agent) == 'professor' && distance(agent) == 1) {
        return flip(.4783);
      } else if (person(agent) == 'professor' && distance(agent) == 5) {
        return flip(.3844);
      } else if (person(agent) == 'professor' && distance(agent) == 10) {
        return flip(.2251);
      } else if (person(agent) == 'facilities' && distance(agent) == 1) {
        return flip(.2798);
      } else if (person(agent) == 'facilities' && distance(agent) == 5) {
        return flip(.2222);
      } else if (person(agent) == 'facilities' && distance(agent) == 10) {
        return flip(.1736);
      } else { return "something went wrong"
      }
    };

    var owns_BC = function(agent) {
      if (person(agent) == 'student' && distance(agent) == 1) {
        return flip(.3789);
      } else if (person(agent) == 'student' && distance(agent) == 5) {
        return flip(.2544);
      } else if (person(agent) == 'student' && distance(agent) == 10) {
        return flip(.1667);
      } else if (person(agent) == 'professor' && distance(agent) == 1) {
        return flip(.7081);
      } else if (person(agent) == 'professor' && distance(agent) == 5) {
        return flip(.4958);
      } else if (person(agent) == 'professor' && distance(agent) == 10) {
        return flip(.3687);
      } else if (person(agent) == 'facilities' && distance(agent) == 1) {
        return flip(.3345);
      } else if (person(agent) == 'facilities' && distance(agent) == 5) {
        return flip(.2507);
      } else if (person(agent) == 'facilities' && distance(agent) == 10) {
        return flip(.1653);
      } else { return "something went wrong"
      }
    };

    var owns_M = function(agent) {
      if (person(agent) == 'student' && distance(agent) == 1) {
        return flip(.1653);
      } else if (person(agent) == 'student' && distance(agent) == 5) {
        return flip(.1298);
      } else if (person(agent) == 'student' && distance(agent) == 10) {
        return flip(.1031);
      } else if (person(agent) == 'professor' && distance(agent) == 1) {
        return flip(.1497);
      } else if (person(agent) == 'professor' && distance(agent) == 5) {
        return flip(.1350);
      } else if (person(agent) == 'professor' && distance(agent) == 10) {
        return flip(.1031);
      } else if (person(agent) == 'facilities' && distance(agent) == 1) {
        return flip(.7532);
      } else if (person(agent) == 'facilities' && distance(agent) == 5) {
        return flip(.6915);
      } else if (person(agent) == 'facilities' && distance(agent) == 10) {
        return flip(.6559);
      } else { return "something went wrong"
      }
    };

    var owns_U = function(agent) {
      if (person(agent) == 'student' && distance(agent) == 1) {
        return flip(.4062);
      } else if (person(agent) == 'student' && distance(agent) == 5) {
        return flip(.3737);
      } else if (person(agent) == 'student' && distance(agent) == 10) {
        return flip(.2265);
      } else if (person(agent) == 'professor' && distance(agent) == 1) {
        return flip(.3932);
      } else if (person(agent) == 'professor' && distance(agent) == 5) {
        return flip(.3755);
      } else if (person(agent) == 'professor' && distance(agent) == 10) {
        return flip(.2005);
      } else if (person(agent) == 'facilities' && distance(agent) == 1) {
        return flip(.4836);
      } else if (person(agent) == 'facilities' && distance(agent) == 5) {
        return flip(.2939);
      } else if (person(agent) == 'facilities' && distance(agent) == 10) {
        return flip(.2265);
      } else { return "something went wrong"
      }
    };


    f(owns_BP, owns_BC, owns_M, owns_U, person, distance)
}}

// Below is an example of the model making normalzied predictions for certain situations. Note that the conditons must
// be the same for each of dist1, dist2, and dist3.
var makeModel = editor.get("makeModel")
var dist1 = Infer({method:'enumerate'}, makeModel(function(owns_BP, owns_BC, owns_M, owns_U, person, distance) {
	condition(person(1) == 'student')
    condition(distance(1) == 10)
    condition(person(2) == 'professor')
    condition(distance(2) == 10)
    condition(person(3) == 'facilities')
    condition(distance(3) == 10)
    owns_U(1)
}))
var dist2 = Infer({method:'enumerate'}, makeModel(function(owns_BP, owns_BC, owns_M, owns_U, person, distance) {
	condition(person(1) == 'student')
    condition(distance(1) == 10)
    condition(person(2) == 'professor')
    condition(distance(2) == 10)
    condition(person(3) == 'facilities')
    condition(distance(3) == 10)
    owns_U(2)
}))
var dist3 = Infer({method:'enumerate'}, makeModel(function(owns_BP, owns_BC, owns_M, owns_U, person, distance) {
	condition(person(1) == 'student')
    condition(distance(1) == 10)
    condition(person(2) == 'professor')
    condition(distance(2) == 10)
    condition(person(3) == 'facilities')
    condition(distance(3) == 10)
    owns_U(3)
}))
var val_stu = Math.exp(dist1.score(true))
var val_prof = Math.exp(dist2.score(true))
var val_fac = Math.exp(dist3.score(true))
var norm = val_stu + val_prof + val_fac
viz.bar(['Student', 'Professor', 'Facilities'], [val_stu / norm, val_prof / norm, val_fac / norm], {xLabel: 'Person', yLabel: 'Normalized Confidence'})
print(val_stu / norm)
print(val_prof / norm)
print(val_fac / norm)

// Below is an example of how we located the maximum conditional ownership probability among our occupations
var dist1 = Infer({method:'enumerate'}, makeModel(function(owns_BP, owns_BC, owns_M, owns_U, person, distance) {
  condition(person(1) == 'student')
  owns_BP(1)
}))
var dist2 = Infer({method:'enumerate'}, makeModel(function(owns_BP, owns_BC, owns_M, owns_U, person, distance) {
  condition(person(1) == 'professor')
  owns_BP(1)
}))
var dist3 = Infer({method:'enumerate'}, makeModel(function(owns_BP, owns_BC, owns_M, owns_U, person, distance) {
  condition(person(1) == 'facilities')
  owns_BP(1)
}))
print("P(Owns | S) = " + Math.exp(dist1.score(true)))
print("P(Owns | P) = " + Math.exp(dist2.score(true)))
print("P(Owns | F) = " + Math.exp(dist3.score(true)))

// Below is an example of how we reviewed cases of explaining away
var dist1 = Infer({method:'enumerate'}, makeModel(function(owns_BP, owns_BC, owns_M, owns_U, person, distance) {
  condition(person(1) == 'student')
  condition(owns_M(1))
  distance(1) == 1
}))
var dist2 = Infer({method:'enumerate'}, makeModel(function(owns_BP, owns_BC, owns_M, owns_U, person, distance) {
  condition(owns_M(1))
  distance(1) == 1
}))
print("P(D = 1 | S and Owns M) = " + Math.exp(dist1.score(true)))
print("P(D = 1 | Owns M) = " + Math.exp(dist2.score(true)))

var dist1 = Infer({method:'enumerate'}, makeModel(function(owns_BP, owns_BC, owns_M, owns_U, person, distance) {
  condition(distance(1) == 1)
  condition(owns_BP(1))
  person(1) == 'student'
}))
var dist2 = Infer({method:'enumerate'}, makeModel(function(owns_BP, owns_BC, owns_M, owns_U, person, distance) {
  condition(owns_BP(1))
  person(1) == 'student'
}))
print("P(Student | D=1 and Owns BP) = " + Math.exp(dist1.score(true)))
print("P(Student | Owns BP) = " + Math.exp(dist2.score(true)))
