export default class SprintsTransformer {
  static sprintsStatsAverages(sprintsArray) {
    const allSprintsStats = this.sprintsStatsTable(sprintsArray)
    let totalAchievedObjectives = 0
    let totalFinishedTasks = 0
    let totalHours = 0
    let totalProgressTasks = 0
    let totalTodoTasks = 0
    let totalBlockedTasks = 0
    for (const key in allSprintsStats) {
      totalAchievedObjectives += allSprintsStats[key].achievedObjectives
      totalFinishedTasks += allSprintsStats[key].tasks?.completedTasks || 0
      totalProgressTasks += allSprintsStats[key].tasks?.progressTasks || 0
      totalTodoTasks += allSprintsStats[key].tasks?.todoTasks || 0
      totalBlockedTasks += allSprintsStats[key].tasks?.blockedTasks || 0
      totalHours += allSprintsStats[key].hours
    }
    return {
      achievedObjectivesAverage:
        totalAchievedObjectives / allSprintsStats.length,
      finishedTasksAverage: totalFinishedTasks / allSprintsStats.length,
      totalHoursAverage: totalHours / allSprintsStats.length,
      totalFinishedTasks,
      totalProgressTasks,
      totalTodoTasks,
      totalBlockedTasks,
    }
  }
  static sprintsStatsTable(sprintsArray) {
    return sprintsArray.map((sprint) => {
      const objectives = sprint.objectives.length || 0
      const hours = this.getHours(sprint.objectives)
      return {
        week: sprint.name || '',
        objectives,
        achievedObjectives: this.getAchievedObjectives(sprint.objectives),
        tasks: this.getTasks(sprint.objectives),
        description: sprint.description,
        hours,
      }
    })
  }

  static getAchievedObjectives(objectivesArray) {
    const achievedObjectives = objectivesArray.filter(
      (objective) =>
        objective.todo.length === 0 &&
        objective.progress.length === 0 &&
        objective.blocked.length === 0 &&
        objective.completed.length !== 0
    )
    return achievedObjectives.length || 0
  }
  static getHours(objectivesArray) {
    let totalHours = 0
    let tasks = []
    for (let objectiveKey in objectivesArray) {
      const tasksByObjective = [
        ...objectivesArray[objectiveKey].todo,
        ...objectivesArray[objectiveKey].progress,
        ...objectivesArray[objectiveKey].blocked,
        ...objectivesArray[objectiveKey].completed,
      ]
      tasks.push(...tasksByObjective)
    }

    for (let key in tasks) {
      totalHours += tasks[key].estimateTime
    }

    return totalHours
  }
  static getTasks(objectivesArray) {
    let totalTasks = 0
    let todoTasks = 0
    let progressTasks = 0
    let completedTasks = 0
    let blockedTasks = 0
    if (objectivesArray.length) {
      for (let key in objectivesArray) {
        totalTasks +=
          objectivesArray[key].todo?.length +
          objectivesArray[key].progress?.length +
          objectivesArray[key].blocked?.length +
          objectivesArray[key].completed?.length

        todoTasks += objectivesArray[key].todo?.length || 0
        progressTasks += objectivesArray[key].progress?.length || 0
        completedTasks += objectivesArray[key].completed?.length || 0
        blockedTasks += objectivesArray[key].blocked?.length || 0
      }
    }
    return {
      totalTasks,
      todoTasks,
      progressTasks,
      completedTasks,
      blockedTasks,
    }
    // return objectivesArray.map((objective) => {
    //   return (
    //     objective.todo.length +
    //     objective.progress.length +
    //     objective.blocked.length +
    //     objective.completed.length
    //   )
    // })
  }
}
