import 'package:flutter/material.dart';
import '../config/theme.dart';

/// AccordionCard — accessible, full-header-clickable accordion.
///
/// The entire header row (stripe + [header] + chevron) is a single [InkWell],
/// so there are no nested tap targets and no duplicate gesture events.
/// A [Semantics] wrapper exposes toggle state to screen readers.
///
/// Parameters:
///   open           controlled open state
///   onToggle       called when the header is tapped
///   stripeColor    left accent stripe colour
///   header         content between the stripe and the chevron
///   footer         always-visible widget rendered below the header
///   child          animated collapsible content
///   semanticLabel  label announced by screen readers
class AccordionCard extends StatelessWidget {
  const AccordionCard({
    super.key,
    required this.open,
    required this.onToggle,
    required this.stripeColor,
    required this.header,
    this.footer,
    this.child,
    this.semanticLabel,
  });

  final bool         open;
  final VoidCallback onToggle;
  final Color        stripeColor;
  final Widget       header;
  final Widget?      footer;
  final Widget?      child;
  final String?      semanticLabel;

  @override
  Widget build(BuildContext context) {
    final dark = AppTheme.isDark(context);
    final borderColor  = open ? AppTheme.brandOf(context)  : AppTheme.borderOf(context);
    final chevronColor = open ? AppTheme.brandOf(context)  : AppTheme.textMutedOf(context);

    return Container(
      decoration: BoxDecoration(
        color: AppTheme.cardOf(context),
        borderRadius: BorderRadius.circular(AppTheme.radiusCard),
        border: Border.all(color: borderColor, width: open ? 1.5 : 1.0),
        boxShadow: open
            ? [
                BoxShadow(
                  color: AppTheme.brandOf(context).withValues(alpha: dark ? 0.15 : 0.08),
                  blurRadius: 24,
                  offset: const Offset(0, 4),
                ),
              ]
            : const [],
      ),
      clipBehavior: Clip.hardEdge,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Semantics(
            button: true,
            label: semanticLabel,
            toggled: open,
            child: Material(
              color: Colors.transparent,
              child: InkWell(
                onTap: onToggle,
                child: IntrinsicHeight(
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Container(width: 5, color: stripeColor),
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 14,
                            vertical: 14,
                          ),
                          child: Row(
                            children: [
                              Expanded(child: header),
                              AnimatedRotation(
                                turns: open ? 0.5 : 0,
                                duration: const Duration(milliseconds: 200),
                                child: Icon(
                                  Icons.keyboard_arrow_down_rounded,
                                  color: chevronColor,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),

          if (footer != null) footer!,

          AnimatedSize(
            duration: const Duration(milliseconds: 200),
            curve: Curves.easeInOut,
            child: open ? (child ?? const SizedBox.shrink()) : const SizedBox.shrink(),
          ),
        ],
      ),
    );
  }
}
