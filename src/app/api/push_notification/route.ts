import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function sendPushNotification(eventName: string, userIds: string[]) {
  const apiKey = process.env["ONESIGNAL_API_KEY"];

  if (!apiKey) {
    throw new Error("ONESIGNAL_API_KEY is not defined");
  }

  await fetch("https://api.onesignal.com/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Key ${apiKey}`,
    },
    body: JSON.stringify({
      app_id: "3ebf5784-d166-4765-b969-4cc13e974bda",
      target_channel: "push",
      name: `The conference ${eventName} is coming!`,
      headings: {
        en: "👋",
      },
      contents: {
        en: `The conference ${eventName} is coming! Don't forget to attend!`,
      },
      // included_segments: ["Total Subscriptions"],
      include_external_user_ids: userIds,
      chrome_web_image:
        "https://avatars.githubusercontent.com/u/11823027?s=200&v=4",
    }),
  });
}

export async function POST(request: Request) {
  const reminders = await prisma.reminder.findMany({
    select: { userId: true, event: true },
  });

  const eventsPerUser = Object.groupBy(
    reminders,
    (reminder) => reminder.event.title
  );

  for (const [eventName, reminders] of Object.entries(eventsPerUser)) {
    const userIds = reminders!.map((reminder) => reminder.userId);
    await sendPushNotification(eventName, userIds);
  }

  return new Response("Push notifications sent successfully.", { status: 200 });
}
