import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, expect, describe, test } from "vitest";

import { FeedList } from "./FeedList";
import { render } from "@tests/test-utils";

const events = [
	{
		id: ":e1",
		title: "Event one",
		description: "This a keynote",
		startDate: new Date(2022, 11, 13),
		endDate: new Date(2022, 11, 14),
		link: "https://example.com",
		organizerId: ":o2",
		virtual: true,
		location: "online",
	},
	{
		id: ":e2",
		title: "Event two",
		description: "This a tech event about TypeScript",
		startDate: new Date(2022, 11, 13),
		endDate: new Date(2022, 11, 14),
		link: "https://example.com",
		organizerId: ":o2",
		virtual: true,
		location: "online",
	},
];

describe("<FeedList />", () => {
	test("should render list of events", () => {
		render(
			<FeedList
				events={events}
				session={null}
				remindMe={vi.fn()}
				remindPerEvent={vi.fn()}
			/>,
		);
		expect(screen.getByText("Event one")).toBeDefined();
		expect(screen.getByText("Event two")).toBeDefined();
	});

	test("should render alert when past conference", async () => {
		const action = vi.fn();
		const user = userEvent.setup();
		render(
			<FeedList
				events={events}
				session={{ expires: "", user: { id: '1', name: "Jeferson" } }}
				remindMe={action}
				remindPerEvent={action}
			/>,
		);

		const subscribeButton = screen.getAllByRole("button", {
			name: /subscribe/i,
		})[0];

		await user.click(subscribeButton);
    
    expect(screen.getByText('You cannot subscribe to a past conference'))
	});
});
