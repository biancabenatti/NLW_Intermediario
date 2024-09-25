import { db } from '../db'
import { goals } from '../db/schema'

interface CreateGoalRequest {
  // Quais dados preciso para criar uma meta
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  const result = await db // Criando no banco
    .insert(goals) // Por padrao nos bancos de dados o insert nao retorna os dados inseridos e sim o numero de registros afetados
    .values({
      title,
      desiredWeeklyFrequency,
    })
    .returning() // Devido ao insert temos que colocar o returning para que retorne os dados inseridos

  const goal = result[0]

  return {
    goal,
  }
}

//A função createGoal permite a criação de uma nova meta no banco de dados, recebendo o título e a frequência desejada, e retorna os dados da meta recém-criada.
