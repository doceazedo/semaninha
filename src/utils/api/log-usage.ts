import { prisma } from '.';

export const logUsage = async (user: string, theme: string, timeElapsed: number, fields: object = {}) => {
  await prisma.usageLog.create({
    data: {
      user,
      theme,
      fields: JSON.stringify(fields),
      timeElapsed
    }
  })
}
