function CalcProgress({ habits }) {
  const getDaysDifference = (lastCompleted) => {
    if (!lastCompleted) return 0;

    const today = new Date();
    const lastCompletedDate = new Date(lastCompleted);
    if (isNaN(lastCompletedDate.getTime())) return 0;

    const timeDifference = today.getTime() - lastCompletedDate.getTime();
    if (timeDifference < 0) {
      console.log("The lastCompleted date is in the future.");
      return 0;
    }

    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  };
  const parseTargetFrequency = (target) => {
    if (typeof target === 'string') {
      switch (target.toLowerCase()) {
        case 'everyday':
          return 1;
        case 'weekly':
          return 7;
        case 'monthly':
          return 30;
        default:
          return 0;
      }
    }
    return parseInt(target) || 0;
  };
  const newProgressList = habits.map((habit) => {
    let daysSinceLastCompleted = getDaysDifference(habit.LastCompleted);
    let targetFrequencyDays = parseTargetFrequency(habit.TargetFrequency);
    if (targetFrequencyDays === 0) {
      return 0;
    }
    let calcProgress = ((targetFrequencyDays - daysSinceLastCompleted) / targetFrequencyDays) * 100;
    if (targetFrequencyDays === 0 || daysSinceLastCompleted < 0) {
      return 0; 
  }
    return calcProgress.toFixed(2);
  });

  return newProgressList;
}

export default CalcProgress
