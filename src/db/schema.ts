import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const goals = pgTable('goals', {
  // Nome tabela
  //Colunas
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
  desiredWeeklyFrequency: integer('desired_weekly_frequency').notNull(), //Numero de vezes que deseja praticar essa meta na semana **integer('desired_weekly_frequency')** = para nao aparecer desiredWeeklyFrequency como esta no lado JS. notNull() = Não pode ser nulo
  createdAt: timestamp('created_at', { withTimezone: true }) // withTimezone: guardar com o fuso horario
    .notNull()
    .defaultNow(), // Quando for criado uma nova meta automaticamente vai ser preenchido o CreatedAt
})

export const goalCompletions = pgTable('goal_completions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  goalId: text('goal_id')
    .references(() => goals.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

// Essas tabelas armazenam informações sobre metas e suas respectivas conclusões, garantindo que cada meta tenha um identificador único e registrando a data de criação tanto das metas quanto das suas conclusões.