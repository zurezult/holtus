'use client'
import { useState } from "react";
import MoodForm from "@/app/components/Moodform";
import EatForm from "./Eatform";
import DrinkForm from "./Drinkform";
import ActivityForm from "./Activityform";
import OutputForm from "./Outputform";
import PromilageForm from "./Promilageform";

export default function UserForm({ user }) {
    const [activeTab, setActiveTab] = useState(null);

    const latestMood = Array.isArray(user.moods) && user.moods.length > 0
        ? user.moods.reduce((latest, current) =>
            new Date(current.created) > new Date(latest.created) ? current : latest
        )
        : null;

    return (
        <div>
            <h1>Invoer</h1>
            <div className="user-form">
                {(activeTab == null || activeTab === 'mood') &&
                    <MoodForm user={user} latestMood={latestMood}
                        onToggle={() => setActiveTab(activeTab === 'mood' ? null : 'mood')} />}
                {(activeTab == null || activeTab === 'drink') &&
                    <DrinkForm user={user} active={activeTab === 'drink'}
                        onToggle={() => setActiveTab(activeTab === 'drink' ? null : 'drink')} />}
                {(activeTab == null || activeTab === 'eat') &&
                    <EatForm user={user} active={activeTab === 'eat'}
                        onToggle={() => setActiveTab(activeTab === 'eat' ? null : 'eat')} />}
                {(activeTab == null || activeTab === 'activity') &&
                    <ActivityForm user={user} active={activeTab === 'activity'}
                        onToggle={() => setActiveTab(activeTab === 'activity' ? null : 'activity')} />}
                {(activeTab == null || activeTab === 'output') &&
                    <OutputForm user={user} active={activeTab === 'output'}
                        onToggle={() => setActiveTab(activeTab === 'output' ? null : 'output')} />}
                        {(activeTab == null || activeTab === 'promilage') &&
                    <PromilageForm user={user} active={activeTab === 'promilage'}
                        onToggle={() => setActiveTab(activeTab === 'promilage' ? null : 'promilage')} />}
            </div>
        </div>
    );
}
