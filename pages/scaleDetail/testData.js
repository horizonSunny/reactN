export default (data = {
  assessmentAnswer: {
    directiveForce: {
      questionInfo: {
        thisYear: { score: 0, answer: "55" },
        thisSeason: { score: 0, answer: 2 },
        thisMonth: { score: 0, answer: "99" },
        today: { score: 0, answer: "66" },
        weekDay: { score: 0, answer: 5 },
        city: { score: 1, answer: 1 },
        county: { score: 0, answer: 0 },
        street: { score: 1, answer: 1 },
        floor: { score: 0, answer: 0 },
        organization: { score: 1, answer: 1 }
      },
      totalScore: 3
    },
    ImmediatelyRecall: {
      questionInfo: {
        ball: { score: 1, answer: 1 },
        nationalFlag: { score: 0, answer: 0 },
        trees: { score: 1, answer: 1 }
      },
      totalScore: 2
    },
    calculAteattention: {
      questionInfo: {
        ninetyThree: { score: 0, answer: "55" },
        eightySix: { score: 0, answer: "99" },
        seventyNine: { score: 0, answer: "55" },
        seventyTwo: { score: 0, answer: "66" },
        sixtyFive: { score: 0, answer: "888" }
      },
      totalScore: 0
    },
    named: {
      questionInfo: {
        watches: { score: 1, answer: 1 },
        pencil: { score: 0, answer: 0 }
      },
      totalScore: 1
    },
    retell: {
      questionInfo: { retell: { score: 1, answer: 1 } },
      totalScore: 1
    },
    read: {
      questionInfo: { closeEyes: { score: 1, answer: 1 } },
      totalScore: 1
    },
    understand: {
      questionInfo: {
        holdPaper: { score: 1, answer: 1 },
        foldedInHalf: { score: 0, answer: 0 },
        onTheLeg: { score: 1, answer: 1 }
      },
      totalScore: 2
    },
    write: {
      questionInfo: { sentence: { score: 1, answer: 1 } },
      totalScore: 1
    },
    viewSpace: {
      questionInfo: { draw: { score: 0, answer: 0 } },
      totalScore: 0
    },
    delayRecall: {
      questionInfo: {
        ball: { score: 1, answer: 1 },
        nationalFlag: { score: 0, answer: 0 },
        trees: { score: 1, answer: 1 }
      },
      totalScore: 2
    }
  },
  result: "重度",
  score: 13,
  assessmentName: "MMSE",
  referenceValue: "≥27",
  assessmentContent: "认知筛选量表"
});
